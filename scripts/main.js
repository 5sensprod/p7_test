import { fetchData } from './data-source/dataFetch.js';
import { getRecipeData } from './data-source/sharedData.js';
import { generateRecipeCards, generateListDropdowns } from './utils/generator.js';
import { addEventListeners } from './handlers/addEventListeners.js';
import { searchRecipes, updateRecipeDisplay } from "./search/recipesSearch.js";
import { addDropdownEvents } from "./utilities/domUtils.js";

async function initialize() {
    await fetchData();
    const data = getRecipeData();

    generateRecipeCards(data);
    generateListDropdowns(data);
    addEventListeners();

    searchRecipes();
    updateRecipeDisplay();
    addDropdownEvents();

}

initialize();