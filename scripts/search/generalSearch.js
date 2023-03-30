import { normalizeString } from '../utils/stringUtils.js';
import { updateDropdownLists } from '../handlers/dropdownUpdates.js';
import { getRecipeDataById } from '../data-source/sharedData.js';

export function searchRecipes() {
  const recipes = document.querySelectorAll('.recipe-card');
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    const query = normalizeString(searchInput.value.trim());
    const filteredRecipesData = [];

    if (query.length >= 3) {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const title = normalizeString(recipe.querySelector('.recipe-card__title').textContent);
        const ingredients = normalizeString(recipe.querySelector('.recipe-card__ingredients').textContent);
        const description = normalizeString(recipe.querySelector('.recipe-card__description').textContent);

        const isMatch = title.includes(query) || ingredients.includes(query) || description.includes(query);

        if (isMatch) {
          recipe.style.display = '';
          const recipeId = parseInt(recipe.getAttribute('data-recipe-id'));
          const recipeData = getRecipeDataById(recipeId);
          filteredRecipesData.push(recipeData);
        } else {
          recipe.style.display = 'none';
        }
      }

      // Mettre à jour les listes déroulantes en fonction des recettes filtrées
      updateDropdownLists(filteredRecipesData);

    } else {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        recipe.style.display = '';
      }

  // Réinitialiser les listes des dropdowns avec les données de recettes d'origine
  const allRecipeData = Array.from(recipes).map(recipe => getRecipeDataById(parseInt(recipe.getAttribute('data-recipe-id'))));
  updateDropdownLists(allRecipeData);
    }
  });
}