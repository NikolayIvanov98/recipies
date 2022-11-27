// 1. Read from storage
// 2. Write to storage
const storageType = "sessionStorage";
const storageKeys = {
  categories: "categories",
  areas: "areas",
};

function readFromStorage(key) {
  const stringValue = window[storageType].getItem(key);
  const parseValue = JSON.parse(stringValue);
  return parseValue;
}

function writeToStorage(key, value) {
  window[storageType].setItem(key, JSON.stringify(value));
}

export { readFromStorage, writeToStorage, storageKeys };
