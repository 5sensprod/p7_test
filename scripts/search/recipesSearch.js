import { normalizeString } from '../utils/stringUtils.js';

export function searchRecipes() {
  const recipes = document.querySelectorAll('.recipe-card');
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    const query = normalizeString(searchInput.value.trim()); // Normaliser la chaîne de caractères de recherche

    if (query.length >= 3) {
      // console.log(`Recherche lancée pour "${query}"`);
      recipes.forEach(recipe => {
        const title = normalizeString(recipe.querySelector('.recipe-card__title').textContent);
        const ingredients = normalizeString(recipe.querySelector('.recipe-card__ingredients').textContent);
        const description = normalizeString(recipe.querySelector('.recipe-card__description').textContent);

        const isMatch = title.includes(query) || ingredients.includes(query) || description.includes(query);

        if (isMatch) {
          recipe.style.display = ''; // Affiche la recette si elle correspond à la recherche
          console.log(`"${title}" correspond à la recherche`);
        } else {
          recipe.style.display = 'none'; // Masque la recette si elle ne correspond pas à la recherche
        }
      });
    } else {
      // Affiche toutes les recettes si la recherche est vide ou trop courte
      recipes.forEach(recipe => {
        recipe.style.display = '';
      });
    }
  });
}