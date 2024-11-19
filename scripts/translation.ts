function updateContent(langData: any) {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');

        if (key)
            elem.textContent = langData[key];
    });
}

async function fetchLanguageData(lang: string) {
    return (await fetch(`../data/${lang}.json`)).json();
}

function setLanguagePreference(lang: string) {
    localStorage.setItem('language', lang);
    location.reload();
}

async function changeLanguage(lang: string) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

window.addEventListener("DOMContentLoaded", async () => {
    const lang = localStorage.getItem("language") || "en";
    const langData = await fetchLanguageData(lang);

    updateContent(langData);
})