import React from 'react';
// This ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'gatsby';
import Layout from '../components/layout';

config.autoAddCss = false;

const NotFound = () => (
  <Layout isNotFound>
    <main className="flex-auto flex-col	justify-center items-center h-screen pb-0">
      <div className="text-5xl">
        <span className="mr-1" role="img" aria-label="Magnifying glass">
          🔎
        </span>
        <span className="mr-1" role="img" aria-label="Thinking face">
          🤔
        </span>
      </div>
      <h1>Page not found</h1>
      <span className="mb-8">Hold on... This page doesn&lsquo;t exist!</span>
      <div>
        <Link to="/">
          <button className="button" type="button">
            Go home
          </button>
        </Link>
      </div>
    </main>
  </Layout>
);

export default NotFound;
