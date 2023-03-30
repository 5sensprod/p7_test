export function normalizeString(str) {
  const accentTable = {
    // Tableau de correspondances pour supprimer les accents
    'À': 'A', 'Â': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
    'Î': 'I', 'Ï': 'I', 'Ô': 'O', 'Ö': 'O', 'Œ': 'OE', 'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ý': 'Y', 'à': 'a',
    'â': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'î': 'i',
    'ï': 'i', 'ô': 'o', 'ö': 'o', 'œ': 'oe', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y'
  };

  // Vérifier si la valeur entrée est une chaîne de caractères
  if (typeof str !== 'string') {
    console.error('normalizeString: La valeur entrée n\'est pas une chaîne de caractères:', str);
    return '';
  }

  // Normaliser la chaîne de caractères
  const normalizedStr = str.toLowerCase().replace(/[À-ÿ]/g, (match) => accentTable[match] || match).trim();

  // Convertir les nombres en chaînes de caractères
  if (!isNaN(normalizedStr)) {
    return normalizedStr.toString();
  }

  return normalizedStr;
}

export function singularize(word) {
  if (word.endsWith('s')) {
    return word.slice(0, -1);
  }
  return word;
}

export function capitalizeFirstWord(str) {
  if (typeof str !== 'string') {
    console.error('capitalizeFirstWord: La valeur entrée n\'est pas une chaîne de caractères:', str);
    return str;
  }

  const [firstWord, ...rest] = str.split(' ');
  return [firstWord.charAt(0).toUpperCase() + firstWord.slice(1), ...rest].join(' ');
}