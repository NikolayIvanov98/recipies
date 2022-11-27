const apiBaseUrl = "https://www.themealdb.com/api/json/v1/1";
const categoriesEndPoint = "/categories.php";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { apiBaseUrl, categoriesEndPoint, fetchData };
export default fetchData;
