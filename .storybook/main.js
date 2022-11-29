const path = require('path')
module.exports = {
  features: {
    postcss: true,
  },
  stories: ['../frontend/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@whitespace/storybook-addon-html',
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      sideEffects: true,
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    }

  ],
  framework: '@storybook/react',
  staticDirs: ['../build'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['scss-loader','style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
      exclude: path.resolve('./node_modules/', '../')
    });
    return config;
  }

}
