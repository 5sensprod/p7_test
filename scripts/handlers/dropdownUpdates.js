export function updateDropdownLists(filteredRecipes) {
  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUstensils = new Set();

  // Parcourir les recettes filtrées et ajouter les éléments uniques
  filteredRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => filteredIngredients.add(ingredient.ingredient));
    filteredAppliances.add(recipe.appliance);
    recipe.ustensils.forEach(ustensil => filteredUstensils.add(ustensil));
  });

  // Mettre à jour les listes déroulantes en fonction des éléments filtrés
  updateDropdownList(document.getElementById("sort-by-ingredients"), filteredIngredients);
  updateDropdownList(document.getElementById("sort-by-appliances"), filteredAppliances);
  updateDropdownList(document.getElementById("sort-by-ustensils"), filteredUstensils);
}

function updateDropdownList(list, filteredItems) {
  const listItems = list.querySelectorAll('li');
  listItems.forEach(item => {
    const originalItem = item.getAttribute('data-original-name');
    item.style.display = filteredItems.has(originalItem) ? '' : 'none';
  });
}