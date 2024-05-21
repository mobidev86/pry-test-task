export const serverDelay = (func) => (duration) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(func());
    }, duration || 1000)
  );

export const getWhitelistFromServer = serverDelay(() => [
  "aaa",
  "aaa1",
  "aaa2",
  "aaa3",
  "bbb1",
  "bbb2",
  "bbb3",
  "bbb4",
]);

export const getValue = serverDelay(() => ["foo", "bar", "baz"]);
