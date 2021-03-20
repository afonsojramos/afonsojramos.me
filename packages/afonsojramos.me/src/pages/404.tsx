import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

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
