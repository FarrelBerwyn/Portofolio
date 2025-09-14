import React from "react";
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageToggle from './LanguageToggle';
import '../assets/styles/Main.scss';

function Main() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQFHC7oJ2O0IWQ/profile-displayphoto-shrink_800_800/B56ZbDaobgGkAc-/0/1747035262461?e=1760572800&v=beta&t=9SXTIGdrNwPijLz2xmHIt8Gb08sy7Vh_szcrH6eR4Bw" alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/FarrelBerwyn" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/farrel-berwyn" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://www.instagram.com/farrel_berwyn" target="_blank" rel="noreferrer"><InstagramIcon/></a>
          </div>
          <LanguageToggle />
          <h1>{t('main.title')}</h1>
          <p>{t('main.role')}</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/FarrelBerwyn" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/farrel-berwyn" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://www.instagram.com/farrel_berwyn" target="_blank" rel="noreferrer"><InstagramIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;