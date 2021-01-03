const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	stories: ["../src/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	typescript: {
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
