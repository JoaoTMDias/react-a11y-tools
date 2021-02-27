/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path")
const fs = require("fs-extra")

exports.onPostBuild = () => {
	fs.copySync(path.join(__dirname, "public"), path.join(__dirname, "../public"), {
		overwrite: true,
	})
}
