import React, { ReactNode } from 'react';
import Footer from './footer';
import Header from './nav/header';
import SEO from './seo';

const Layout = ({ isNotFound, children }: { isNotFound: boolean; children: ReactNode }) => {
  return (
    <div id="root" className="bg-primary dark:bg-primary">
      <SEO />
      <Header />
      <div className="flex flex-col min-h-screen">
        <div id="content">
          {children}
          {!isNotFound && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
