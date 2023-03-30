import { normalizeString } from '../utils/stringUtils.js';
import { getRecipeData } from '../data-source/sharedData.js';
import { updateDropdownLists } from '../ui/updateDisplay.js';
import { updateAvailableCriteria } from '../handlers/updateCriteria.js';

export function updateRecipeDisplay(filterDropdowns = false) {
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  const recipes = document.querySelectorAll('.recipe-card');
  const recipeData = getRecipeData();
  const filteredRecipes = [];

  recipes.forEach((recipe, index) => {
    let shouldDisplay = true;

    searchCriteria.forEach(criteria => {
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
        : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
          : 'ustensil';

      const text = criteria.textContent.trim();
      const normalizedText = normalizeString(text);

      if (listType === 'ingredient') {
        const ingredients = recipeData[index].ingredients.map(ingredient => normalizeString(ingredient.ingredient));
        if (!ingredients.includes(normalizedText)) {
          shouldDisplay = false;
        }
      } else if (listType === 'appliance') {
        const appliance = normalizeString(recipeData[index].appliance);
        if (appliance !== normalizedText) {
          shouldDisplay = false;
        }
      } else {
        const ustensils = recipeData[index].ustensils.map(ustensil => normalizeString(ustensil));
        if (!ustensils.includes(normalizedText)) {
          shouldDisplay = false;
        }
      }
    });

    recipe.style.display = shouldDisplay ? '' : 'none';
    if (shouldDisplay) {
      filteredRecipes.push(recipeData[index]);
      // const recipeTitle = recipe.querySelector('.recipe-card__title').textContent;
      // const recipeIngredients = recipeData[index].ingredients.map(ingredient => ingredient.ingredient);
      // const recipeAppliance = recipeData[index].appliance;
      // const recipeustensils = recipeData[index].ustensils;
      // console.log(`"${recipeTitle}" - Ingrédients: ${recipeIngredients.join(', ')} - Appareil: ${recipeAppliance} - Ustensiles: ${recipeustensils.join(', ')}`);
    }
  });

  // Appeler updateDropdownLists avec le tableau filteredRecipes seulement si filterDropdowns est true
  if (filterDropdowns) {
    // Appeler updateDropdownLists avec le tableau filteredRecipes
    updateDropdownLists(filteredRecipes);
  }

  // Ajoutez cette ligne à la fin de la fonction updateRecipeDisplay
  updateAvailableCriteria(filteredRecipes.map(recipe => {
    return {
      id: parseInt(recipe.id),
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    };
  }));
}

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