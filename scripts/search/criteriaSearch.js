import { normalizeString } from '../utils/stringUtils.js';
import { getRecipeData } from '../data-source/sharedData.js';
import { updateDropdownLists, updateAvailableCriteria } from '../handlers/dropdownUpdates.js';

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
    }
  });

  // Appeler updateDropdownLists avec le tableau filteredRecipes seulement si filterDropdowns est true
  if (filterDropdowns) {
    // Appeler updateDropdownLists avec le tableau filteredRecipes
    updateDropdownLists(filteredRecipes);
  }

  // Appeler updateAvailableCriteria avec le tableau filteredRecipes
  updateAvailableCriteria(filteredRecipes.map(recipe => {
    return {
      id: parseInt(recipe.id),
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    };
  }));
}

function createSearchCriteriaList(listType) {
  const searchCriteriaDiv = document.querySelector('.search-criteria');
  let searchCriteriaList = searchCriteriaDiv.querySelector(`.search-criteria__list--${listType}`);

  // Vérifie si la div existante est trouvée
  if (!searchCriteriaList) {
    // Si la liste n'existe pas, créer une nouvelle liste avec la classe appropriée
    searchCriteriaList = document.createElement('ul');
    searchCriteriaList.classList.add('search-criteria__list');
    searchCriteriaList.classList.add(`search-criteria__list--${listType}`);
    searchCriteriaDiv.appendChild(searchCriteriaList);

    // Ordonne les listes dans l'ordre ingrédients > appareils > ustensiles
    const ingredientsList = searchCriteriaDiv.querySelector('.search-criteria__list--ingredient');
    const appliancesList = searchCriteriaDiv.querySelector('.search-criteria__list--appliance');
    const ustensilsList = searchCriteriaDiv.querySelector('.search-criteria__list--ustensil');

    if (ingredientsList) {
      searchCriteriaDiv.appendChild(ingredientsList);
    }
    if (appliancesList) {
      searchCriteriaDiv.appendChild(appliancesList);
    }
    if (ustensilsList) {
      searchCriteriaDiv.appendChild(ustensilsList);
    }
  }
  return searchCriteriaList;
}

export function displayInSearchCriteria(text, listType) {
  const searchCriteriaList = createSearchCriteriaList(listType);

  // Vérifie si le critère existe déjà dans la liste
  const existingCriteria = searchCriteriaList.querySelectorAll('.search-criteria__item');
  const existingItem = Array.from(existingCriteria).find(item => item.textContent === text);
  if (existingItem) {
    // Si le critère existe déjà, ne fait rien
    return;
  }

  // Sinon, ajouter simplement le critère à l'intérieur de la liste
  const searchCriteriaItem = document.createElement('li');
  searchCriteriaItem.classList.add('search-criteria__item');
  searchCriteriaItem.classList.add(`search-criteria__item--${listType}`);
  searchCriteriaItem.textContent = text;
  searchCriteriaList.appendChild(searchCriteriaItem);

  const closeButton = document.createElement('img');
  closeButton.src = 'img/icon-close.svg';
  closeButton.alt = 'close icon';
  closeButton.classList.add('search-criteria__close-icon');
  closeButton.addEventListener('click', () => {
    searchCriteriaItem.remove();
    if (searchCriteriaList.querySelectorAll('.search-criteria__item').length === 0) {
      searchCriteriaList.remove();
    }
    // Ajoutez cet appel ici pour mettre à jour l'affichage des recettes après avoir supprimé un critère
    updateRecipeDisplay();
  });
  searchCriteriaItem.appendChild(closeButton);

  // Met à jour l'affichage des recettes après avoir ajouté un critère
  updateRecipeDisplay();
}

export function attachClickListenerToDropdownItem(listItem, listType) {
  listItem.addEventListener("click", () => {
    displayInSearchCriteria(listItem.textContent, listType);
  });
}