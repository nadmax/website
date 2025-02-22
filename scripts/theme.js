const modeToggle = document.getElementById('switchTheme');
const body = document.body;
const currentMode = localStorage.getItem('mode');
const currentTheme = localStorage.getItem('theme');

if (currentMode)
    body.classList.add(currentMode);

if (currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme);

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        body.removeAttribute('class');
        localStorage.setItem('mode', '');
        localStorage.setItem('theme', 'light');
    }
});