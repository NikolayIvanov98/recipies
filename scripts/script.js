import fetchData, {
  apiBaseUrl,
  categoriesEndpoint,
  fetchMealsByCategory,
  fetchMealsById,
} from "./fetchData.js";
import {
  readFromStorage,
  writeToStorage,
  storageKeys,
} from "./storageControl.js";

const categoriesFilterDiv = document.getElementById(
  "detailed-categories-filter"
);
const resultsContainer = document.getElementById("results-contaienr");

async function visualiseMealById(id) {
  const {
    meals: [recipe],
  } = await fetchMealsById(id);
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strSource,
  } = recipe;

  resultsContainer.innerHTML = "";

  const htmlString = `
  <div>
        <h2>${strMeal}</h2>

        <h4>
          <a
            href="${strSource}"
            target="_blank"
            >Original source</a
          >
        </h4>
        <img
          src="${strMealThumb}"
          alt="image"
        />
        <table>
          <tr>
            <th>Category</th>
            <th>Origin</th>
          </tr>
          <tr>
            <td>${strCategory}</td>
            <td>${strArea}</td>
          </tr>
        </table>
        <p>
          ${strInstructions}
        </p>
      </div>
  `;
  resultsContainer.insertAdjacentHTML("beforeend", htmlString);
}

function createMealPreviewElement(meal) {
  const { idMeal, strMealThumb, strMeal } = meal;
  const recipeDiv = document.createElement("div");
  recipeDiv.className = "category-box";
  recipeDiv.setAttribute("id", idMeal);
  recipeDiv.addEventListener("click", () => visualiseMealById(idMeal));

  const recipeImg = document.createElement("img");
  recipeImg.setAttribute("src", strMealThumb);

  const recipeTitle = document.createElement("h4");
  recipeTitle.textContent = strMeal;

  recipeDiv.appendChild(recipeImg);
  recipeDiv.appendChild(recipeTitle);
  resultsContainer.appendChild(recipeDiv);
}

async function showMealsByCategory(category) {
  const { meals } = await fetchMealsByCategory(category);

  resultsContainer.innerHTML = "";

  meals.forEach((recipe) => {
    createMealPreviewElement(recipe);
  });

  if (window.innerHeight < window.innerWidth) {
    window.scrollTo({ top: 0 });
  } else {
    window.scrollTo(0, resultsContainer.offsetTop);
  }
}

function createCategoryElement(categoryObj) {
  const { strCategory: title, strCategoryThumb: imgSrc } = categoryObj;

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category-box";
  categoryDiv.addEventListener("click", () => showMealsByCategory(title));

  const categoryThumb = document.createElement("img");
  categoryThumb.setAttribute("src", imgSrc);
  categoryThumb.setAttribute("alt", `${title} category image`);

  const categoryTitle = document.createElement("h4");
  categoryTitle.textContent = title;

  categoryDiv.appendChild(categoryThumb);
  categoryDiv.appendChild(categoryTitle);
  return categoryDiv;
}

async function main() {
  let categories = [];
  categories = readFromStorage(storageKeys.categories);

  if (!categories) {
    const { categories: remoteCategories } = await fetchData(
      apiBaseUrl + categoriesEndpoint
    );
    categories = remoteCategories;
    writeToStorage(storageKeys.categories, categories);
  }

  categories.forEach((el) => {
    const newCategoryEl = createCategoryElement(el);
    categoriesFilterDiv.appendChild(newCategoryEl);
  });
}

main();
