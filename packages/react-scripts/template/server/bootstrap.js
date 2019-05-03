require('ignore-styles');

// NODE_ENV=development node server/bootstrap.js

process.env.NODE_ENV = 'development';
require("@babel/register")({
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
        '@babel/proposal-class-properties',
        'babel-plugin-transform-assets'
    ]
});

require('./index');
