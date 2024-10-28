function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');

        elem.textContent = langData[key];
    });
}

async function fetchLanguageData(lang) {
    return await fetch(`../data/${lang}.json`).json();
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

window.addEventListener("DOMContentLoaded", async () => {
    const lang = localStorage.getItem("language") || "en";
    const langData = await fetchLanguage(lang);

    updateContent(langData);
})