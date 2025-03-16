const langSelector = document.getElementById('lang-selector');

langSelector.addEventListener('change', () => {
    const selectedLang = langSelector.value;

    fetch(`/locales/${selectedLang}.json`)
        .then(res => res.json())
        .then(translations => {
            updateTranslations(translations);
            
            const currentPath = window.location.pathname.split('/').slice(2).join('/');

            window.history.pushState({}, '', `/${selectedLang}/${currentPath}`);
        });
})

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
    if (Array.isArray(key))
        key = key.join('.');

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