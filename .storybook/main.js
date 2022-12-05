const path = require('path')
module.exports = {
  features: {
    postcss: true,
  },
  stories: ['../frontend/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions:{
          implementation: require("sass"),
        },
        cssLoaderOptions: {
          importLoaders: 2,
        }
      },
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@whitespace/storybook-addon-html',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  staticDirs: ['../build'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(pc|sa|sc|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../'),
      exclude: path.resolve('./node_modules/', '../'),
    })
    
    return config
  },
}
