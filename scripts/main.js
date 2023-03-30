import { fetchData } from './data-source/dataFetch.js';
import { getRecipeData } from './data-source/sharedData.js';
import { generateRecipeCards, generateListDropdowns } from './utils/generator.js';
import { addDropdownItemClickListeners } from './handlers/dropdownItemListeners.js';
import { searchRecipes } from "./search/generalSearch.js";
import { updateRecipeDisplay } from "./search/criteriaSearch.js";
import { addDropdownEvents } from "./handlers/dropdownInteractions.js";

async function initialize() {
    await fetchData();
    const data = getRecipeData();

    generateRecipeCards(data);
    generateListDropdowns(data);
    addDropdownItemClickListeners();
    addDropdownEvents();

    searchRecipes();
    updateRecipeDisplay();

}

initialize();