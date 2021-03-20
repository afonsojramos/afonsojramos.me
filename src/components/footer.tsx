import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { GetSiteConfig } from '../hooks';

const Footer = () => {
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case 'GitHub':
        return <FontAwesomeIcon icon={faGithub} />;
      case 'Linkedin':
        return <FontAwesomeIcon icon={faLinkedinIn} />;
      case 'Telegram':
        return <FontAwesomeIcon icon={faTelegramPlane} />;
      default:
        return null;
    }
  };

  const currentYear = () => new Date().getFullYear();

  const { name, socialMedia } = GetSiteConfig();

  return (
    <footer className="py-2 text-center text-gray-600 text-xs">
      <ul className="">
        {socialMedia &&
          socialMedia.map(({ url, identifier }) => (
            <li className="inline mx-2 text-base" key={identifier}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {socialIcon(identifier)}
              </a>
            </li>
          ))}
      </ul>
      <span className="text-sm">
        Made with{' '}
        <span role="img" aria-label="Heart">
          ❤️
        </span>{' '}
        © {currentYear()} {name}
      </span>
    </footer>
  );
};

export default Footer;
