import React from 'react';

export const links = ['home', 'about', 'contact'];

const DesktopNavLinks = () => {
  return (
    <div>
      {links.map((link) => (
        <li key={link}>
          <a href={`#${link}`} className="link">
            {link}
          </a>
        </li>
      ))}
    </div>
  );
};

export default DesktopNavLinks;
