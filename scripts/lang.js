const langSelector = document.getElementById('lang-selector');
const savedLang = localStorage.getItem('userLang');

if (savedLang) {
    langSelector.value = savedLang;
    loadTranslations(savedLang);
    updateLanguage(savedLang);
}

langSelector.addEventListener('change', () => {
    const selectedLang = langSelector.value;

    localStorage.setItem('userLang', selectedLang);
    loadTranslations(selectedLang);
    updateLanguage(selectedLang);
});

function loadTranslations(selectedLang) {
    fetch(`/locales/${selectedLang}.json`)
        .then(res => res.json())
        .then(translations => updateTranslations(translations));
}

function updateTranslations(translations) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const value = getNestedTranslation(translations, key);

        if (value)
            element.innerHTML = value;
    });
}

function getNestedTranslation(translations, key) {
    if (Array.isArray(key))
        key = key.join('.');

    return key.split('.').reduce((acc, part) => {
        const arrayMatch = part.match(/(\w+)\[(\d+)\]/);

        if (arrayMatch) {
            const arrayKey = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);

            return acc[arrayKey][index];
        } else
            return acc[part];
    }, translations);
}

function updateLanguage(language) {
    const currentPath = window.location.pathname.split('/').slice(2).join('/');

    if (!window.location.pathname.startsWith(`/${language}/`)) {
        window.history.pushState({}, '', `/${language}/${currentPath}`);
        document.documentElement.setAttribute('lang', language);
    }
}