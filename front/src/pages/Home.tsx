import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface BackendResponse {
  language: string;
  common: {
    title: string;
    footer: string;
    about: string;
    appointment: string;
  };
  page: {
    presentation: string;
    services: string;
    contact: string;
    title: string;
  }
}

const Home: React.FC = () => {
  const [data, setData] = useState<BackendResponse | null>(null);
  const [_, setTheme] = useState<'light' | 'dark'>('light');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [metaKeywords, setMetaKeywords] = useState<string>('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    fetch('http://localhost:8080/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Data received:', responseData);
        setData(responseData);
        
        const lang = responseData.language;
        if (lang === 'fr') {
          setMetaDescription("Découvrez mes services d'Administrateur Système Linux et de DevOps garantissant sécurité, performance et haute disponibilité.");
          setMetaKeywords('Linux, DevOps, Freelance, Administrateur, Système, Automatisation');
        } else {
          setMetaDescription("Reliable Linux System Administration and DevOps services to optimize and secure your infrastructure.");
          setMetaKeywords('Linux, DevOps, Freelance, Automation, Administrator, System');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      document.title = data.common.title || 'Maximilien Nadji';
      
      const metaTags = {
        'description': metaDescription,
        'keywords': metaKeywords,
      };
      
      Object.entries(metaTags).forEach(([name, content]) => {
        if (content) {
          let meta = document.querySelector(`meta[name="${name}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
          }
          meta.setAttribute('content', content);
        }
      });
    }
  }, [data, metaDescription, metaKeywords]);

  const handleLanguageChange = (newLanguage: string) => {
    console.log(`Language changed to: ${newLanguage}`);
    
    if (newLanguage === 'fr') {
      setMetaDescription("Découvrez mes services d'Administrateur Système Linux et de DevOps garantissant sécurité, performance et haute disponibilité.");
      setMetaKeywords('Linux, DevOps, Freelance, Administrateur, Système, Automatisation');
    } else {
      setMetaDescription("Reliable Linux System Administration and DevOps services to optimize and secure your infrastructure.");
      setMetaKeywords('Linux, DevOps, Freelance, Automation, Administrator, System');
    }
  };

  const handleThemeToggle = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const { language, common, page } = data;

  return (
    <>
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onThemeToggle={handleThemeToggle}
      />
      <section className="content">
        <div className="content-container">
          <h2>{page.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.presentation }} />
          <h2>Services</h2>
          <div dangerouslySetInnerHTML={{ __html: page.services }} />
          <div dangerouslySetInnerHTML={{ __html: page.contact }} />
        </div>
      </section>
      <Footer footerText={common.footer || ''} />
    </>
  );
};

export default Home;