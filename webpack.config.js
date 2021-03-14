const path                      = require('path');
const webpack                   = require('webpack');
const HTMLWebpackPlugin         = require('html-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const TerserWebpackPlugin       = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const splitChunksConfigs = {
    dev: {
        cacheGroups: {
            default: false,
            vendors: false,
        }
    },
    prod: {
        chunks: 'all',
        cacheGroups: {
            framework: {
                chunks: 'all',
                name: 'framework',
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
                priority: 40,
                enforce: true
            },
            styled: {
                name: 'styledvendor',
                test: /[\\/]node_modules[\\/](styled-components|@emotion)[\\/]/,
                chunks: 'all'
            },
            query: {
                name: 'query',
                test: /[\\/]node_modules[\\/](react-query)[\\/]/,
                chunks: 'all'
            }
        },
        maxInitialRequests: 25,
        minSize: 20000
    }
};

const optimization = () => {
    const config = {
        minimize: !isDev,
        realContentHash: false,
        runtimeChunk: isDev ? { name: 'webpack' } : 'single',
        moduleIds: 'deterministic',
        splitChunks: isDev ? splitChunksConfigs.dev : splitChunksConfigs.prod
    };

    if (!isDev) {
        config.minimizer = [
            new TerserWebpackPlugin({
                terserOptions: {
                    sourceMap: true,
                    compress: true
                }
            })
        ]
    };

    return config;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    devtool: 'source-map',

    entry: [
        path.resolve(__dirname, './src/index.tsx')
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].build.js',
        publicPath: '/',
    },

    stats: {
		chunks: true,
		chunkRelations: true
	},

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.svg'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'apiSingelton': path.resolve(__dirname, 'apiSingelton.ts'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@assets': path.resolve(__dirname, 'public/static/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@layouts': path.resolve(__dirname, 'src/layouts')
        }
    },

    optimization: optimization(),

    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        publicPath: '/',
        compress: true,
        hot: true,
        port: 3000,
        quiet: false,
        noInfo: isDev,
        stats: { colors: true }
    },

    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: !isDev,
                removeComments: !isDev,
            }
        }),
        isDev && new webpack.HotModuleReplacementPlugin(),
        isDev && new ReactRefreshWebpackPlugin(),
        new CleanWebpackPlugin(),
    ].filter(Boolean),

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['@babel/preset-env',
                                {
                                    'targets': {
                                        'esmodules': true,
                                    }
                                }],
                                '@babel/preset-typescript',
                                ['@babel/preset-react', {
                                    'runtime': 'automatic'
                                }],
                            ],
                            plugins: [
                                isDev && require('react-refresh/babel'),
                                '@babel/plugin-proposal-class-properties',
                                ['babel-plugin-styled-components', {
                                    'pure': true,
                                    'displayName': isDev,
                                    'fileName': isDev,
                                    'minify': !isDev,
                                    'transpileTemplateLiterals': isDev
                                }]
                            ].filter(Boolean),
                        }
                    }
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
        ]
    }
};
