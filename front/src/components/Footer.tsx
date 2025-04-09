import React from 'react';

interface FooterProps {
    footerText: string;
}

const Footer: React.FC<FooterProps> = ({ footerText }) => {
    return (
        <footer>
            <p data-key="common.footer">{footerText}</p>
        </footer>
    );
};

export default Footer;