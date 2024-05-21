import "./App.scss";
import MixedMode from "./components/MixedMode";
import useSuggestions from "./hooks/useSuggestions";
import useStore from "./store";
import { useEffect } from "react";

function App() {
  const { suggestions, setSuggestions } = useStore();
  const { data, isLoading, isError } = useSuggestions();

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data, setSuggestions]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error..</div>;
  }

  return (
    <>
      <div className="p-8">
        <MixedMode />
      </div>
    </>
  );
}

export default App;
