"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (key)
            elem.textContent = langData[key];
    });
}
function fetchLanguageData(lang) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield fetch(`../data/${lang}.json`)).json();
    });
}
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}
function changeLanguage(lang) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setLanguagePreference(lang);
        const langData = yield fetchLanguageData(lang);
        updateContent(langData);
    });
}
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const lang = localStorage.getItem("language") || "en";
    const langData = yield fetchLanguageData(lang);
    updateContent(langData);
}));
