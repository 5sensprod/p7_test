import { addUniqueListItem } from "../utils/dropdownListUtils.js";

function clearDropdownList(dropdownList) {
  const listItems = dropdownList.querySelectorAll('li:not(.dropdown__item--default)');

  listItems.forEach(item => {
    item.remove();
  });
}

export function updateAvailableCriteria(filteredRecipes) {
  const ingredientsList = document.getElementById("sort-by-ingredients");
  const appliancesList = document.getElementById("sort-by-appliances");
  const ustensilsList = document.getElementById("sort-by-ustensils");

  // Nettoyer les listes déroulantes existantes
  clearDropdownList(ingredientsList);
  clearDropdownList(appliancesList);
  clearDropdownList(ustensilsList);

  // Remplir les listes avec les éléments des recettes affichées
  filteredRecipes.forEach(recipe => {
    if (recipe) {
      recipe.ingredients.forEach(ingredient => {
        const text = ingredient.ingredient;
        addUniqueListItem(ingredientsList, text, 'ingredient');
      });

      const appliance = recipe.appliance;
      addUniqueListItem(appliancesList, appliance, 'appliance');

      recipe.ustensils.forEach(ustensil => {
        const text = ustensil;
        addUniqueListItem(ustensilsList, text, 'ustensil');
      });
    }
  });
}