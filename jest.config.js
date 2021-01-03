module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	testURL: "http://localhost/",
	setupFiles: ["raf/polyfill"],
	collectCoverage: true,
	coverageReporters: ["lcov", "text-summary", "clover"],
	coverageThreshold: {
		global: {
			statements: 95,
			branches: 95,
			functions: 95,
			lines: 95,
		},
	},
	moduleNameMapper: {
		"\\.(css|scss)$": "identity-obj-proxy",
		"\\.(png|gif)$": "identity-obj-proxy",
	},
	modulePathIgnorePatterns: ["npm-cache", ".npm", ".cache"],
};
