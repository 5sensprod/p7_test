// Met une majuscule au élements de la liste
function capitalize(str) {
  const words = str.split(' ');
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  words[0] = firstWord;
  return words.join(' ');
}
// Définir la fonction normalizeString
export function normalizeString(str) {
  // Tableau de correspondances pour supprimer les accents
  const accentTable = {
    'À': 'A', 'Â': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
    'Î': 'I', 'Ï': 'I', 'Ô': 'O', 'Ö': 'O', 'Œ': 'OE', 'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ý': 'Y', 'à': 'a',
    'â': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'î': 'i',
    'ï': 'i', 'ô': 'o', 'ö': 'o', 'œ': 'oe', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y'
  };

  // Convertir la chaîne de caractères en minuscules
  let normalizedStr = str.toLowerCase();

  // Supprimer les accents
  let accents = Object.keys(accentTable).join('');
  let accentRegex = new RegExp(`[${accents}]`, 'g');
  normalizedStr = normalizedStr.replace(accentRegex, (match) => accentTable[match] || match);

  // Supprimer les espaces en début et en fin de chaîne
  normalizedStr = normalizedStr.trim();

  // Convertir les nombres en chaînes de caractères
  if (!isNaN(normalizedStr)) {
    normalizedStr = normalizedStr.toString();
  }

  return normalizedStr;
}

// Définir la fonction addUniqueListItem

export function addUniqueListItem(list, item, type) {
  const normalizedItem = normalizeString(item); // Normaliser l'élément

  // Vérifier si l'élément existe déjà dans la liste
  const existingItem = list.querySelector(`.dropdown__menu-item--${type}[data-name="${normalizedItem}"]`);

  // Vérifier si l'élément existe déjà dans les critères de recherche
  const searchCriteria = document.querySelector('.search-criteria');
  const existingCriteria = searchCriteria.querySelectorAll('.search-criteria__item');
  const existingContainer = Array.from(existingCriteria).find(
    (criteriaItem) => criteriaItem.textContent === normalizedItem && criteriaItem.parentElement.classList.contains(`search-criteria__container--${type}`)
  );

  if (!existingItem && !existingContainer) {
    // Si l'élément n'existe pas encore, créez un nouvel élément de liste et ajoutez-le à la liste
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown__menu-item');
    listItem.classList.add(`dropdown__menu-item--${type}`);
    const capitalizedItem = capitalize(item);
    listItem.textContent = capitalizedItem;
    listItem.setAttribute('data-name', normalizedItem); // Ajouter l'élément normalisé à l'attribut 'data-name'
    listItem.setAttribute('data-original-name', item); // Ajouter l'élément non normalisé à l'attribut 'data-original-name'
    list.appendChild(listItem);
  }
}

export function filterDropdownItems(inputElement, listElement) {
  inputElement.addEventListener('input', () => {
    const filter = normalizeString(inputElement.value); // Normaliser la valeur de l'élément de saisie
    const items = listElement.querySelectorAll('.dropdown__menu-item');
    items.forEach(item => {
      const itemName = normalizeString(item.getAttribute('data-name')); // Normaliser le nom de l'élément de la liste
      if (itemName.includes(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}