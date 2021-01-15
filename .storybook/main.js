const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
		return config;
	},
};
