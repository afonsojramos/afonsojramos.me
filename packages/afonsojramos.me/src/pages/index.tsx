import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { IContentStructure } from '../content';
/* import Banner from '../components/sections/banner';
import About from '../components/sections/about';
import Timeline from '../components/sections/timeline';
import Portfolio from '../components/sections/portfolio'; */

export default ({ data }: IContentStructure) => (
  <Layout isNotFound={false}>
    <main className="max-w-4xl flex-grow mx-auto flex flex-col justify-around">
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
