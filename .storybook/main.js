const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const MAX_ASSETS_SIZE = 1024 * 1024;

module.exports = {
	stories: ["../stories/*.stories.@(ts|tsx|js|jsx|mdx)"],
	addons: [
		{
			name: "@storybook/addon-docs",
			options: {
				mdxBabelOptions: {
					babelrc: true,
					configFile: true,
				},
				configureJSX: true,
			},
		},
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-scss",
	],
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				allowSyntheticDefaultImports: false,
				esModuleInterop: false,
			},
		},
	},
	webpackFinal: async (config) => {
		config.resolve.plugins.push(new TsconfigPathsPlugin({}));
		return {
			...config,
			optimization: {
				splitChunks: {
					chunks: "all",
					minSize: 30 * 1024,
					maxSize: MAX_ASSETS_SIZE,
				},
			},
			performance: {
				maxAssetSize: MAX_ASSETS_SIZE,
			},
		};
	},
};
