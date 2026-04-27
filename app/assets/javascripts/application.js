//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  
  // code to click on the card-clickable link when the click is done anywhere in the card
  const cards = document.querySelectorAll('.card--clickable');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.card__link');
      if (link) {
        link.click();
      }
    });
  });

  /////// search function for prisoner search ////////////

  document.addEventListener('DOMContentLoaded', () => {
  // 1. Select all necessary elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('searchTerm');
  const formGroup = document.getElementById('search-form-group');
  const fieldError = document.getElementById('searchTerm-issued-error');
  const errorSummary = document.getElementById('error-summary-container');
  const startSearchMsg = document.getElementById('startSearch');
  const table = document.getElementById('prisoner-table');
  const noResults = document.getElementById('no-results');
  const tableRows = document.querySelectorAll('#prisoner-table .govuk-table__body .govuk-table__row');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filter = searchInput.value.trim().toUpperCase();

    // --- STATE 1: HANDLE EMPTY SEARCH (ERRORS) ---
    if (filter === "") {
      // Show Error Summary and Field Error
      if (errorSummary) errorSummary.style.display = "block";
      fieldError.style.display = "block";
      
      // Apply GOV.UK Error Styling (Red Borders)
      formGroup.classList.add('govuk-form-group--error');
      searchInput.classList.add('govuk-input--error');

      // Hide results/instructions
      table.style.display = "none";
      noResults.style.display = "none";
      if (startSearchMsg) startSearchMsg.style.display = "none";

      // Accessibility: Move focus to the Error Summary
      if (errorSummary) errorSummary.querySelector('.govuk-error-summary').focus();
      return; // Stop further execution
    }

    // --- STATE 2: HANDLE VALID SEARCH (CLEAR ERRORS) ---
    if (errorSummary) errorSummary.style.display = "none";
    fieldError.style.display = "none";
    formGroup.classList.remove('govuk-form-group--error');
    searchInput.classList.remove('govuk-input--error');
    if (startSearchMsg) startSearchMsg.style.display = "none";

    // --- STATE 3: PERFORM SEARCH & FILTER TABLE ---
    let matchesFound = 0;
    const maxResults = 10;

    tableRows.forEach(row => {
      const nameCell = row.cells[0].textContent.toUpperCase();
      const idCell = row.cells[1].textContent.toUpperCase();

      if ((nameCell.includes(filter) || idCell.includes(filter)) && matchesFound < maxResults) {
        row.style.display = "";
        matchesFound++;
      } else {
        row.style.display = "none";
      }
    });

    // Handle Search Outcome
    if (matchesFound === 0) {
      table.style.display = "none";
      noResults.style.display = "block";
    } else {
      table.style.display = "table";
      noResults.style.display = "none";
    }
  });
});




//////////////////////////

const backLink = document.getElementById('back-link');
if (backLink) {
  backLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevents the default # link behaviour
    window.history.back();
  });
}

///////////// accessible autocomplete for what court ////////////

// 1. COURT SELECT
const courtElement = document.querySelector('#choose-court');
if (courtElement) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: courtElement,
    id: 'choose-court-autocomplete', // Explicit unique ID for the new input
    displayMenu: 'overlay',
    source: (query, populateResults) => {
      const options = courtElement.querySelectorAll('option');
      const results = Array.from(options)
        .filter(opt => opt.text.toLowerCase().includes(query.toLowerCase()))
        .map(opt => opt.text.trim());
      populateResults(results);
    }
  });
}

// 2. REASON SELECT
const reasonElement = document.querySelector('#appearance-reason');
if (reasonElement) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: reasonElement,
    id: 'appearance-reason-autocomplete', // Different explicit unique ID
    displayMenu: 'overlay',
    source: (query, populateResults) => {
      const options = reasonElement.querySelectorAll('option');
      const results = Array.from(options)
        .filter(opt => opt.text.toLowerCase().includes(query.toLowerCase()))
        .map(opt => opt.text.trim());
      populateResults(results);
    }
  });
}

// 3. COURT LOCATION SELECT
const locationElement = document.querySelector('#court-location');
if (locationElement) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: locationElement,
    id: 'court-location-autocomplete', // Unique ID for this instance
    displayMenu: 'overlay',
    source: (query, populateResults) => {
      const options = locationElement.querySelectorAll('option');
      const results = Array.from(options)
        .filter(opt => opt.text.toLowerCase().includes(query.toLowerCase()))
        .map(opt => opt.text.trim());
      populateResults(results);
    }
  });
}


})

