// next.config.js
module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });
      return config;
    },
  };