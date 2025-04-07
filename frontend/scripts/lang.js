document.documentElement.classList.add("loading");

const langSelector = document.getElementById("lang-selector");
const savedLang = localStorage.getItem("lang");
const language = savedLang || navigator.language.split("-")[0] || "en";
const page = window.location.pathname.split("/").filter(Boolean).pop() || "index";

setLanguage(language, page);

function setLanguage(lang, page) {
    langSelector.value = lang;
    loadTranslations(lang, page);
    document.documentElement.setAttribute("lang", lang);
}

langSelector.addEventListener("change", () => {
    const selectedLang = langSelector.value;
    setLanguage(selectedLang, page);
    localStorage.setItem("lang", selectedLang);
});

function loadTranslations(selectedLang, currentPage) {
    Promise.all([
        fetch(`/locales/${selectedLang}/common.json`).then(res => res.json()), 
        fetch(`/locales/${selectedLang}/${currentPage}.json`).then(res => res.json())
    ])
    .then(([commonTranslations, pageTranslations]) => {
        const mergedTranslations = {
            common: commonTranslations, 
            page: pageTranslations 
        };
        updateTranslations(mergedTranslations);
        document.documentElement.classList.remove("loading");
    })
    .catch(error => console.error("Error loading translations:", error));
}

function updateTranslations(translations) {
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        const value = getNestedTranslation(translations, key);

        if (value)
            element.innerHTML = value;
    });
}

function getNestedTranslation(translations, key) {
    return key.split(".").reduce((acc, part) => acc?.[part], translations);
}