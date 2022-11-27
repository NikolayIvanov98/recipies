import fetchData, { apiBaseUrl, categoriesEndPoint } from "./fetchData.js";
import {
  readFromStorage,
  writeToStorage,
  storageKeys,
} from "./storageControl.js";
const categoriesFilterDiv = document.getElementById(
  "detailed-categories-filter"
);

function createCategoryElement(categoryObj) {
  const { strCategory, strCategoryThumb } = categoryObj;

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category-box";

  const categoryThumb = document.createElement("img");
  categoryThumb.setAttribute("src", strCategoryThumb);
  categoryThumb.setAttribute("alt", `${strCategory} category image`);

  const categoryTitle = document.createElement("h4");
  categoryTitle.textContent = strCategory;
  categoryDiv.appendChild(categoryThumb);
  categoryDiv.appendChild(categoryTitle);
  return categoryDiv;
}

async function main() {
  let categories = [];
  categories = readFromStorage(storageKeys.categories);

  if (!categories) {
    const { categories: fetchedCategoreis } = await fetchData(
      apiBaseUrl + categoriesEndPoint
    );
    categories = fetchedCategoreis;
    writeToStorage(storageKeys.categories, categories);
  }

  categories.forEach((element) => {
    const newCategoryElement = createCategoryElement(element);
    categoriesFilterDiv.appendChild(newCategoryElement);
  });
}

main();
