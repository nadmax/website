const modeToggle = document.getElementById('switchTheme');
const body = document.body;
const root = document.documentElement;
const currentMode = localStorage.getItem('mode');
const currentTheme = localStorage.getItem('theme');

if (currentMode)
    applyTheme(currentMode, currentTheme || 'light');
else
    switchThemeBasedOnTime();

function applyTheme(mode, theme) {
    body.classList.toggle('dark-mode', mode === 'dark');
    root.setAttribute('data-theme', theme);
    localStorage.setItem('mode', mode);
    localStorage.setItem('theme', theme);
}

modeToggle.addEventListener('click', () => {
    const newMode = body.classList.contains('dark-mode') ? 'light' : 'dark';

    applyTheme(newMode, newMode);
});

function switchThemeBasedOnTime() {
    if (currentMode) 
        return;

    const hour = new Date().getHours();
    const newMode = (hour >= 18 || hour < 6) ? 'dark' : 'light';

    applyTheme(newMode, newMode);
}

window.addEventListener('DOMContentLoaded', switchThemeBasedOnTime);
