import React from 'react';

export const links = ['home', 'about', 'contact'];

const DesktopNavLinks = () => {
  return (
    <div className="">
      {links.map((link) => (
        <li key={link}>
          <a href={`#${link}`} className="link">
            {link}
          </a>
        </li>
      ))}
      <li>
        <button /* onClick={toggleTheme} */ type="button">
          <span>night </span>
          {/*  <Icon name={theme === 'dark' ? 'day' : 'night'} /> */}
        </button>
      </li>
    </div>
  );
};

export default DesktopNavLinks;
