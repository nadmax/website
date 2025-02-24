function changeLanguage(lang) {
    const page = document.body.getAttribute("data-page");

    fetch(`/translations/${lang}/${page}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector("#about").textContent = data.about;
            switch (page) {
                case "index":
                    document.querySelector("#title").textContent = data.title;
                    document.querySelector("#presentation").innerHTML = data.presentation;
                    document.querySelector("#services").innerHTML = data.services;
                    document.querySelector("#contact").innerHTML = data.contact;
                    break;
                case "blog_index":
                    document.querySelector("#brr").textContent = data.brr;
                    document.querySelector("#usb").textContent = data.usb;
                    document.querySelector("#linux").textContent = data.linux;
                    document.querySelector("#freelance").textContent = data.freelance;
                    break;
                case "brr":
                    document.querySelector("#title").textContent = data.title;
                    document.querySelector("#content").innerHTML = data.content;
                    document.querySelector("#final").innerHTML = data.final;
                default:
                    document.querySelector("#title").textContent = data.title;
                    document.querySelector("#content").innerHTML = data.content;
            }
        })
        .catch(error => console.error("Error: ", error));

    localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    const langSelector = document.querySelector("#lang-selector");

    langSelector.value = savedLang;
  
    changeLanguage(savedLang);
});