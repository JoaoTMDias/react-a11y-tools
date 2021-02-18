module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	coverageDirectory: "jest-coverage",
	coverageReporters: ["lcov", "text-summary", "clover"],
	coverageThreshold: {
		global: {
			statements: 95,
			branches: 95,
			functions: 95,
			lines: 95,
		},
	},
	testURL: "http://localhost/",
	setupFiles: ["raf/polyfill"],
	moduleNameMapper: {
		"\\.(css|scss)$": "identity-obj-proxy",
		"\\.(png|gif)$": "identity-obj-proxy",
	},
	modulePathIgnorePatterns: ["npm-cache", ".npm", ".cache", "<rootDir>/cypress/"],
};
