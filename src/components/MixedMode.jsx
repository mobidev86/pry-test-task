import React, { useEffect, useState } from "react";
import { MixedTags } from "@yaireo/tagify/dist/react.tagify";
import useStore from "../store";

const MixedMode = () => {
  const { suggestions, total, setTotal } = useStore();
  const [transformedData, setTransformedData] = useState([]);
  const [lookup, setLookup] = useState({});
  const [showTotal, setShowTotal] = useState(null);
  const [error, setError] = useState(null);

  const calculateResult = (input) => {
    setError(null);
    try {
      let totalHoldValue = 0;
      let stringWithoutSpaces2 = input.split(" ").join("");

      totalHoldValue = eval(stringWithoutSpaces2);
      return totalHoldValue.toFixed(2);
    } catch (error) {
      setError("Invalid Expression!");
      return null;
    }
  };

  function replaceJsonTags(input) {
    return input.replace(/\[\[\{.*?"value":"(.*?)".*?\}\]\]/g, (match, p1) => {
      return lookup[p1] !== undefined ? lookup[p1] : match;
    });
  }

  const onChange = (e) => {
    let inputPass = replaceJsonTags(e.detail?.value);
    const total = calculateResult(inputPass);
    setTotal(total);
  };

  const onFinalClick = () => {
    setShowTotal(true);
  };

  useEffect(() => {
    if (suggestions) {
      const transformed = suggestions.map((item) => ({
        value: item.name,
        hold: item.value,
      }));
      const dummy = {};
      suggestions.forEach((item) => {
        dummy[item.name] = item.value;
      });
      setLookup(dummy);
      setTransformedData(transformed);
    }
  }, [suggestions]);

  useEffect(() => {
    if (total) {
      setError(null);
    }
    if (error) {
      setTotal(null);
    }
  }, [error, total]);

  if (transformedData.length < 1) {
    return;
  }

  const settings = {
    tagTextProp: "value",
    pattern: /#/,
    dropdown: {
      enabled: 1,
      classname: "extra-properties",
    },
    templates: {
      tag: function (v) {
        try {
          return `
          <tag
          title="${v.value}"
          contenteditable="false"
          spellcheck="false"
          tabindex="-1"
          class="tagify__tag tagify--noAnim"
          value="${v.value}"
          hold="${v.hold}"
          prefix="#"
        >
          <x
            title=""
            class="tagify__tag__removeBtn"
            role="button"
            aria-label="remove tag"
          ></x>
          <div class="tag_container">
          <span class="tagify__tag-text">${v.value} </span>
          <span class="tagify__tag-hold">[ ${v.hold} ]</span>
          </div>
        </tag>
          
          `;
        } catch (err) {}
      },

      dropdownItem: function (tagData) {
        try {
          return `
          <div class='tagify__dropdown__item'>
            <span>${tagData.value} </span>
            <span>[ ${tagData.hold} ]</span>
          </div>`;
        } catch (err) {}
      },
    },
    enforceWhitelist: true,
    whitelist: transformedData,
  };

  return (
    <div>
      <br />
      <br />
      <div className="w-full flex items-center gap-x-2">
        <MixedTags
          autoFocus={true}
          settings={settings}
          className="myTags"
          readOnly={false}
          onChange={onChange}
        />

        <button
          className="bg-black text-white p-2 rounded-lg"
          onClick={onFinalClick}
        >
          Evaluate
        </button>
      </div>
      {showTotal && <div className="font-bold text-xl ">Total : {total}</div>}
      {error && <div className="font-bold text-xl text-red-500 ">{error}</div>}
    </div>
  );
};

export default MixedMode;
