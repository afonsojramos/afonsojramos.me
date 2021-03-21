import React from 'react';
// This ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { IContentStructure } from '../content';
import heroImage from '../images/hero-image.svg';

config.autoAddCss = false;
/* import Banner from '../components/sections/banner';
import About from '../components/sections/about';
import Timeline from '../components/sections/timeline';
import Portfolio from '../components/sections/portfolio'; */

export default ({ data }: IContentStructure) => (
  <Layout isNotFound={false}>
    <main className="max-w-4xl flex-grow mx-auto flex flex-col justify-around">
      <div className="sm:flex sm:flex-row-reverse sm:items-center">
        <div className="sm:px-2">
          <h1 className="px-4 pt-5 text-2xl text-left text-primary font-bold sm:text-3xl">Base website</h1>
          <p className="px-4 mt-8 text-lg text-primary sm:mt-8">This is just a place holder, soon it will start having content</p>
        </div>
        <img className="w-full max-w-lg mt-16 mx-auto sm:w-1/2" src={heroImage} alt="Gatsby and Tailwind CSS together" />
      </div>

      <button className="btn btn-green m-auto my-5" type="button">
        <a href="https://github.com/afonsojramos/afonsojramos.e" className="p-4 text-white text-xs">
          View on GitHub
        </a>
      </button>

      <div className="flex items-center p-3 mx-2 bg-white rounded shadow-xs sm:mx-auto">
        <code className="text-secondary text-xs leading-xl">npx afonsojramos</code>
      </div>
      <div className="mt-12 lg:mt-32 lg:m-auto text-center">
        <button
          type="button"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-cool-gray-100 text-gray-800 animate-bounce hover:text-gray-900 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
      {/* <Banner data={data.hero.edges} />
      <About data={data.about.edges} />
      <Timeline data={data.experience.edges} />
      <Timeline data={data.extra.edges} />
      <Portfolio data={data.portfolio.edges} /> */}
    </main>
  </Layout>
);

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            slogan
          }
          html
        }
      }
    }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            education {
              date
              degree
              school
              web
              details
              link
            }
            languages {
              language
              icon
              level
            }
          }
          html
        }
      }
    }
    experience: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/experience/" } }) {
      edges {
        node {
          frontmatter {
            title
            jobs {
              date
              title
              company
              link
              bullets
            }
          }
          html
        }
      }
    }
    extra: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/extra-curricular/" } }) {
      edges {
        node {
          frontmatter {
            title
            jobs {
              date
              title
              company
              link
              bullets
            }
          }
          html
        }
      }
    }
    portfolio: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/portfolio/" } }) {
      edges {
        node {
          frontmatter {
            title
            projects {
              title
              description
              github
              keywords
            }
          }
          html
        }
      }
    }
  }
`;
