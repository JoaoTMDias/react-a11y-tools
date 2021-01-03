import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";

const theme = create({
	base: "light",
	brandTitle: "React A11y Tools",
});

addons.setConfig({
	panelPosition: "bottom",
	theme,
	viewMode: "docs",
});
