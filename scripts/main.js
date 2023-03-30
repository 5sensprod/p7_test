import { fetchData } from './data-source/dataFetch.js';
import { getRecipeData } from './data-source/sharedData.js';
import { createRecipeElements } from './utils/createRecipeElements.js';
import { addEventListeners } from './handlers/addEventListeners.js';
import { searchRecipes, updateRecipeDisplay } from "./search/recipesSearch.js";
import { addUniqueListItems } from "./utils/addUniqueListItems.js";

async function initialize() {
    await fetchData();
    const data = getRecipeData();

    createRecipeElements(data);
    addUniqueListItems(data);
    addEventListeners();

    searchRecipes();
    updateRecipeDisplay();
}

initialize();