const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const { theme } = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    author: '@afonsojramos',
    basePath: '/',
    siteDescription:
      'Afonso is a Software Engineer based in the planet Earth, who specializes in architecturing and developing incredible APIs, Desktop Applications and anything that does not mess around with HTML.',
    siteHeadline: 'Backend Engineer',
    siteImage: '/icon.png',
    siteKeywords: 'Afonso Ramos, Afonso, Ramos, afonsojramos, software engineer, Backend Engineer, Software Engineer',
    siteLanguage: 'en',
    siteTitle: 'Afonso Ramos',
    siteTitleAlt: 'Software Engineer',
    siteUrl: 'https://afonsojramos.me',
    siteConfig: {
      name: 'Afonso Ramos',
      location: 'Porto, Portugal',
      email: 'afonsojorgeramos@gmail.com',
      github: 'https://github.com/afonsojramos',
      socialMedia: [
        {
          identifier: 'GitHub',
          url: 'https://github.com/afonsojramos',
        },
        {
          identifier: 'Linkedin',
          url: 'https://www.linkedin.com/in/afonsojramos',
        },
        {
          identifier: 'Telegram',
          url: 'https://www.t.me/afonsojramos',
        },
      ],
      navLinks: [
        {
          section: 'About',
          url: '#about',
        },
        {
          section: 'Experience',
          url: '#experience',
        },
        {
          section: 'Extra Curricular',
          url: '#extracurricular',
        },
        {
          namsectione: 'Portfolio',
          url: '#portfolio',
        },
      ],
    },
  },
  plugins: [
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-smoothscroll',
    'gatsby-transformer-remark',
    'gatsby-plugin-offline',
    'gatsby-plugin-use-dark-mode',
    'gatsby-plugin-webpack-bundle-analyser-v2',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Recursive'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Afonso Ramos | Software Engineer',
        short_name: 'Afonso Ramos',
        description: 'Afonso is a Software Engineer based in the planet Earth.',
        start_url: '/',
        background_color: theme.colors.background,
        theme_color: theme.colors.theme,
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
  ],
};