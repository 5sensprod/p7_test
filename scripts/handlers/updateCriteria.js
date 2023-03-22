import { addUniqueListItem, normalizeString } from '../utilities/utils.js';
import { getRecipeData } from '../data-source/sharedData.js';

export function updateAvailableCriteria() {
    const displayedRecipes = document.querySelectorAll('.recipe-card:not([style*="display:none"])');
    const ingredientsList = document.getElementById("sort-by-ingredients");
    const appliancesList = document.getElementById("sort-by-appliances");
    const ustensilsList = document.getElementById("sort-by-ustensils");
  
    // Remplir les listes avec les éléments des recettes affichées
    displayedRecipes.forEach(recipe => {
      const recipeData = getRecipeData().find(data => data.id === parseInt(recipe.dataset.id));
  
      recipeData.ingredients.forEach(ingredient => {
        const text = normalizeString(ingredient.ingredient);
        addUniqueListItem(ingredientsList, text, 'ingredient');
      });
  
      const appliance = recipeData.appliance;
      addUniqueListItem(appliancesList, appliance, 'appliance');
  
      recipeData.ustensils.forEach(ustensil => {
        const text = normalizeString(ustensil);
        addUniqueListItem(ustensilsList, text, 'ustensil');
      });
    });
  }