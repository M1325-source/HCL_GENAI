// "script.js". Let me fix this and create the file properly. REST Countries API - Country Explorer
// Using https://restcountries.com/ API

// API Base URL
const API_BASE_URL = 'https://restcountries.com/v3.1';

// DOM Elements
const searchType = document.getElementById('searchType');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const countriesGrid = document.getElementById('countriesGrid');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const noResults = document.getElementById('noResults');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');

// Global variables
let allCountries = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme preference
    loadThemePreference();
    
    // Fetch all countries
    fetchAllCountries();
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    resetBtn.addEventListener('click', handleReset);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Allow Enter key to search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Back to top button visibility
    window.addEventListener('scroll', handleScroll);
    
    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Theme Management
function loadThemePreference() {
    const savedTheme = localStorage.getItem('countryExplorerTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('countryExplorerTheme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'bi bi-sun';
    } else {
        icon.className = 'bi bi-moon-stars';
    }
}

// Back to Top visibility handler
function handleScroll() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Fetch all countries from API
async function fetchAllCountries() {
    showLoading();
    hideError();
    hideNoResults();
    
    try {
        const response = await fetch(`${API_BASE_URL}/all?fields=name,cca2,cca3,capital,region,subregion,flags,population,languages,currencies`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch countries data');
        }
        
        const data = await response.json();
        allCountries = data;
        displayCountries(allCountries);
        hideLoading();
    } catch (error) {
        console.error('Error fetching countries:', error);
        showError('Failed to load countries. Please try again later.');
        hideLoading();
    }
}

// Display countries as cards
function displayCountries(countries) {
    countriesGrid.innerHTML = '';
    
    if (countries.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    
    countries.forEach((country, index) => {
        const card = createCountryCard(country, index);
        countriesGrid.appendChild(card);
    });
}

// Create a country card element
function createCountryCard(country, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';
    
    const card = document.createElement('div');
    card.className = 'country-card';
    card.style.animationDelay = `${(index % 8) * 0.05}s`;
    
    // Get country name (use common name, fallback to official name)
    const name = country.name.common || country.name.official;
    
    // Get capital (handle cases where capital might be undefined)
    const capital = country.capital ? country.capital[0] : 'N/A';
    
    // Get region
    const region = country.region || 'N/A';
    
    // Get flag URL
    const flagUrl = country.flags.png || country.flags.svg;
    const flagAlt = country.flags.alt || `Flag of ${name}`;
    
    card.innerHTML = `
        <div class="flag-container">
            <img src="${flagUrl}" alt="${flagAlt}" class="country-flag" loading="lazy">
        </div>
        <div class="country-card-body">
            <h5 class="country-name" title="${name}">${name}</h5>
            <p class="country-info"><i class="bi bi-building"></i> <strong>Capital:</strong> ${capital}</p>
            <p class="country-info"><i class="bi bi-globe"></i> <strong>Region:</strong> ${region}</p>
            <p class="country-info"><i class="bi bi-hash"></i> <strong>Code:</strong> ${country.cca2 || 'N/A'}</p>
        </div>
    `;
    
    col.appendChild(card);
    return col;
}

// Handle search
function handleSearch() {
    const searchTypeValue = searchType.value;
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        displayCountries(allCountries);
        return;
    }
    
    let filteredCountries = [];
    
    switch (searchTypeValue) {
        case 'name':
            filteredCountries = searchByName(searchTerm);
            break;
        case 'code':
            filteredCountries = searchByCode(searchTerm);
            break;
        case 'region':
            filteredCountries = searchByRegion(searchTerm);
            break;
        case 'capital':
            filteredCountries = searchByCapital(searchTerm);
            break;
    }
    
    displayCountries(filteredCountries);
}

// Search by country name
function searchByName(term) {
    return allCountries.filter(country => {
        const name = country.name.common ? country.name.common.toLowerCase() : '';
        const officialName = country.name.official ? country.name.official.toLowerCase() : '';
        return name.includes(term) || officialName.includes(term);
    });
}

// Search by country code
function searchByCode(term) {
    return allCountries.filter(country => {
        const cca2 = country.cca2 ? country.cca2.toLowerCase() : '';
        const cca3 = country.cca3 ? country.cca3.toLowerCase() : '';
        return cca2 === term || cca3 === term || cca2.includes(term) || cca3.includes(term);
    });
}

// Search by region (continent)
function searchByRegion(term) {
    return allCountries.filter(country => {
        const region = country.region ? country.region.toLowerCase() : '';
        const subregion = country.subregion ? country.subregion.toLowerCase() : '';
        return region.includes(term) || subregion.includes(term);
    });
}

// Search by capital
function searchByCapital(term) {
    return allCountries.filter(country => {
        if (!country.capital) return false;
        return country.capital.some(cap => cap.toLowerCase().includes(term));
    });
}

// Handle reset
function handleReset() {
    searchInput.value = '';
    searchType.value = 'name';
    displayCountries(allCountries);
    hideNoResults();
    hideError();
}

// UI Helper Functions
function showLoading() {
    loading.style.display = 'flex';
    countriesGrid.innerHTML = '';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function showNoResults() {
    noResults.style.display = 'block';
}

function hideNoResults() {
    noResults.style.display = 'none';
}
