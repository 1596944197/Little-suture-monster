const path = require('path');
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    config.resolve.alias['@/'] = path.resolve(__dirname)

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/renderer/public')],
  },
};
