"use strict";
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const currentMode = localStorage.getItem('mode');
if (currentMode) {
    body.classList.add(currentMode);
}
modeToggle === null || modeToggle === void 0 ? void 0 : modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode'))
        localStorage.setItem('mode', 'dark-mode');
    else
        localStorage.setItem('mode', '');
});
