document.documentElement.classList.add('loading');

const langSelector = document.getElementById('lang-selector');
const savedLang = localStorage.getItem('lang');
const langFromURL = getLanguageFromUrl();

function getLanguageFromUrl() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[1] === 'fr' ? pathParts[1] : 'en';
}

if (!savedLang || savedLang === langFromURL)
    setLanguage(langFromURL);
else
    setLanguage(savedLang);


function setLanguage(lang) {
    langSelector.value = lang;
    loadTranslations(lang);
    updateLanguage(lang);
}

langSelector.addEventListener('change', () => {
    const selectedLang = langSelector.value;
    setLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
});

function loadTranslations(selectedLang) {
    fetch(`/locales/${selectedLang}.json`)
        .then(res => res.json())
        .then(translations => {
            updateTranslations(translations);
            document.documentElement.classList.remove('loading');
        });
}

function updateTranslations(translations) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const value = getNestedTranslation(translations, key);

        if (value) {
            element.innerHTML = value;
        }
    });
}

function getNestedTranslation(translations, key) {
    if (Array.isArray(key)) key = key.join('.');
    
    return key.split('.').reduce((acc, part) => {
        const arrayMatch = part.match(/(\w+)\[(\d+)\]/);

        if (arrayMatch) {
            const arrayKey = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);
            return acc[arrayKey][index];
        } else {
            return acc[part];
        }
    }, translations);
}

function updateLanguage(language) {
    const currentPath = window.location.pathname.split('/').slice(2).join('/');
    if (!window.location.pathname.startsWith(`/${language}/`)) {
        window.history.pushState({}, '', `/${language}/${currentPath}`);
        document.documentElement.setAttribute('lang', language);
    }
}