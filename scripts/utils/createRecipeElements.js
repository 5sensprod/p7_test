import { createRecipeCard } from "../factories/recipeCardFactory.js";

export function createRecipeElements(data) {
  const recipesContainer = document.querySelector('.recipes-container');
  data.forEach(recipe => {
    // Création des cartes de recettes
    const recipeCard = createRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}