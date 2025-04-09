import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.svg';

interface NavbarProps {
    language: string;
    onLanguageChange: (newLanguage: string) => void;
    onThemeToggle: (newTheme: 'light' | 'dark') => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, onThemeToggle }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(false);
        }
    }, []);

    const handleThemeSwitch = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        onThemeToggle(newTheme);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onLanguageChange(event.target.value);
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <ul>
                    <li>
                        <a href="/">
                            <img
                                src={logo}
                                alt="Logo"
                                className="logo"
                                width="100"
                                height="85"
                            />
                            <span className="sitename">Maximilien Nadji</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="nav-right">
                <ul>
                    <li className="icons" id="switchTheme" onClick={handleThemeSwitch}>
                        <img
                            src={isDarkMode ? '../assets/images/sun.svg' : '../assets/images/moon.svg'}
                            className={isDarkMode ? 'moon' : 'sun'}
                            alt="Theme toggle"
                            width="24"
                            height="24"
                        />
                    </li>

                    <li>
                        <div className="langs">
                            <label htmlFor="lang-selector" className="sr-only">
                                Choose a language
                            </label>
                            <select
                                className="lang-selector"
                                id="lang-selector"
                                name="lang-selector"
                                value={language}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">🇬🇧 English</option>
                                <option value="fr">🇫🇷 Français</option>
                            </select>
                        </div>
                    </li>

                    <li>
                        <a id="toggle-nav" onClick={() => alert('Toggle navigation')}>
                            <img
                                className="bars"
                                src="../assets/images/menu-bar.svg"
                                alt="menu"
                                width="20"
                                height="20"
                            />
                        </a>
                    </li>
                </ul>

                <ul id="links" className="links">
                    <li>
                        <a href="/appointment">Appointment</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/maximilien-nadji/">LinkedIn</a>
                    </li>
                    <li>
                        <a href="/blog/">Blog</a>
                    </li>
                    <li>
                        <a href="https://github.com/nadmax">GitHub</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </div>

        </nav>
    );
};

export default Navbar;