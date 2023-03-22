import { createRecipeCard } from "../factories/recipesFactory.js";
import { searchRecipes, updateRecipeDisplay } from "../search/recipesSearch.js";
import { addUniqueListItem } from "../utilities/utils.js";
import { displayInSearchCriteria } from "../handlers/displayCriteria.js";
// import { updateRecipeDisplay } from '../search/recipesSearch.js';
import { setRecipeData } from './sharedData.js';

fetch('https://5sensprod.github.io/projet7-LesPetitsPlats/data/recipes.json')
  .then(response => response.json())
  .then(data => {
    setRecipeData(data);
    // Créer les éléments de la liste d'ingrédients
    const ingredientsList = document.getElementById("sort-by-ingredients");

    // Créer les éléments de la liste d'appareils
    const appliancesList = document.getElementById("sort-by-appliances");

    // Créer les éléments de la liste d'ustensiles
    const ustensilsList = document.getElementById("sort-by-ustensils");

    // Créer les cartes de recettes
    const recipesContainer = document.querySelector('.recipes-container');

    data.forEach(recipe => {
      // Création des cartes de recettes
      const recipeCard = createRecipeCard(recipe);
      recipesContainer.appendChild(recipeCard);

      // Ajout des éléments uniques à chaque liste
      recipe.ingredients.forEach(ingredient => {
        addUniqueListItem(ingredientsList, ingredient.ingredient, 'ingredient');
      });

      recipe.ustensils.forEach(ustensil => {
        addUniqueListItem(ustensilsList, ustensil, 'ustensil');
      });

      addUniqueListItem(appliancesList, recipe.appliance, 'appliance');
    });

    // Gestion des événements pour chaque élément de liste
    ingredientsList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
      listItem.addEventListener('click', () => {
        displayInSearchCriteria(listItem.textContent, 'ingredient');
      });
    });

    ustensilsList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
      listItem.addEventListener('click', () => {
        displayInSearchCriteria(listItem.textContent, 'ustensil');
      });
    });

    appliancesList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
      listItem.addEventListener('click', () => {
        displayInSearchCriteria(listItem.textContent, 'appliance');
      });
    });
        // Appelez la fonction de recherche une fois que les cartes de recettes ont été ajoutées au DOM
        searchRecipes();

        // Ajoutez cet appel à updateRecipeDisplay() ici
updateRecipeDisplay();

        
  })
  .catch(error => console.log(error));
