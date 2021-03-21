import React from 'react';
import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

const Header = () => {
  return (
    <header>
      <div className="relative">
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
