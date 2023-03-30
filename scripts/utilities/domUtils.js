import { filterDropdownItems } from './utils.js';

const dropdownToggles = [
  document.getElementById('toggle-sort-by-ingredients'),
  document.getElementById('toggle-sort-by-appliances'),
  document.getElementById('toggle-sort-by-ustensils'),
];

function handleFocus(toggle) {
  toggle.value = '';
  toggle.classList.add('dropdown__toggle--active');
}

function handleBlur(toggle, initialText) {
  if (toggle.value === '') {
    toggle.value = initialText;
  }
  toggle.classList.remove('dropdown__toggle--active');
}

function handleClick(event, toggle, initialText, dropdownToggles) {
  event.stopPropagation();
  
  resetOtherDropdownToggles(toggle, dropdownToggles);
  
  toggle.type = 'text';
  toggle.placeholder = `Rechercher par ${initialText}`;
  
  const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
  if (dropdownMenu) {
    dropdownMenu.classList.add('dropdown__menu--active');
  }
}

function resetOtherDropdownToggles(toggle, dropdownToggles) {
  dropdownToggles.forEach((otherToggle) => {
    if (otherToggle !== toggle) {
      otherToggle.type = 'button';
      otherToggle.placeholder = '';

      const otherDropdownMenu = otherToggle.closest('.dropdown').querySelector('.dropdown__menu');
      if (otherDropdownMenu) {
        otherDropdownMenu.classList.remove('dropdown__menu--active');
      }

      otherToggle.classList.remove('dropdown__toggle--active');
    }
  });
}

function handleDocumentClick(dropdownToggles) {
  dropdownToggles.forEach((toggle) => {
    toggle.type = 'button';
    toggle.placeholder = '';

    const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('dropdown__menu--active');
    }

    toggle.classList.remove('dropdown__toggle--active');
  });
}

dropdownToggles.forEach((toggle) => {
  const initialText = toggle.value;

  toggle.addEventListener('focus', () => handleFocus(toggle));
  toggle.addEventListener('blur', () => handleBlur(toggle, initialText));
  toggle.addEventListener('click', (event) => handleClick(event, toggle, initialText, dropdownToggles));
  toggle.addEventListener('input', () => {
    const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
    filterDropdownItems(toggle, dropdownMenu);
  });
});

document.addEventListener('click', () => handleDocumentClick(dropdownToggles));