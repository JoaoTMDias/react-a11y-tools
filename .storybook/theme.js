/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import { create, themes } from "@storybook/theming/create";

export default create({
	...themes.dark,
	base: "dark",

	colorPrimary: "#34c5ea",
	colorSecondary: "#346aea",

	// UI
	appBg: "hsla(240, 7%, 2%, 1)",
	appContentBg: "hsla(240, 7%, 3%, 1)",
	appBorderColor: "#3c3f48",
	appBorderRadius: 4,

	// Toolbar default and active colors
	barTextColor: "hsla(240, 7%, 96%, 1)",
	barSelectedColor: "hsla(240, 7%, 100%, 1)",
	barBg: "hsla(240, 7%, 4%, 1)",

	// Brand
	brandTitle: "react-a11y-tools",
	brandUrl: "https://www.npmjs.com/package/react-a11y-tools",
});
