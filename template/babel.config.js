module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
      'react-native-reanimated/plugin',
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
