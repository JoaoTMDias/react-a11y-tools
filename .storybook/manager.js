import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";

const theme = create({
	base: "dark",
	brandTitle: "React a11y Tools",
});

addons.setConfig({
	panelPosition: "bottom",
	theme,
	viewMode: "docs",
});
