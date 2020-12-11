module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/jsx-max-depth': [
      2,
      {
        max: 3,
      },
    ],
    'react/display-name': 0,
    'react/jsx-no-bind': [
      2,
      {
        ignoreDOMComponents: false,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: true,
      },
    ],
    'react/default-props-match-prop-types': 0,
    'react/destructuring-assignment': [2, 'always'],
    'react/no-deprecated': 0,
    'react/jsx-no-duplicate-props': [
      2,
      {
        ignoreCase: true,
      },
    ],
    'react/jsx-one-expression-per-line': [
      2,
      {
        allow: 'single-child',
      },
    ],
    'react/jsx-fragments': [2, 'element'],
    'react/jsx-pascal-case': [
      2,
      {
        allowAllCaps: false,
      },
    ],
    'react/state-in-constructor': [2, 'never'],
    'react/jsx-boolean-value': 2,
    'react/jsx-handler-names': [
      2,
      {
        eventHandlerPrefix: 'on',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/sort-comp': [
      2,
      {
        order: [
          'static-methods',
          'static-variables',
          'instance-variables',
          'lifecycle',
          'everything-else',
          '/^on.+$/',
          'instance-methods',
          '/^render.+$/',
          'render',
        ],
        groups: {
          lifecycle: [
            'defaultProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'getDerivedStateFromProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
        },
      },
    ],
    'react/jsx-props-no-spreading': [
      2,
      {
        html: 'enforce',
        custom: 'enforce',
      },
    ],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'react/no-did-mount-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-multi-comp': 2,
    'react/no-redundant-should-component-update': 2,
    'react/no-unescaped-entities': 1,
    'react/no-unsafe': 0,
    'react/no-unused-state': 1,
    'react/no-will-update-set-state': 2,
    'react/prop-types': 0,
    'react/self-closing-comp': 2,
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-raw-text': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    'no-extend-native': 0,
    'no-tabs': 0,
    'no-nested-ternary': 0,
    'no-async-promise-executor': 0,
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
