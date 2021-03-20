import React from 'react';
import Footer from './footer';
import Header from './header';
import SEO from './seo';

const Layout = ({ isNotFound, children }: { isNotFound: boolean; children: unknown }) => {
  return (
    <div id="root">
      <SEO />
      <div className="flex flex-col min-h-screen bg-gray-200">
        <Header />
        <div id="content">
          {children}
          {!isNotFound && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
