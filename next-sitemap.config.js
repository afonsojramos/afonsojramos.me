module.exports = {
  siteUrl: 'https://afonsojramos.me',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority:
        path === '/'
          ? '1.0'
          : path.includes('/blog/')
          ? '0.5'
          : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    };
  }
};
