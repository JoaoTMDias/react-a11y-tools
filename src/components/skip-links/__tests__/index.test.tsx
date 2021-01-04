/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React from "react";
import { render } from "@testing-library/react";
import { SkipLink, SKIP_LINK_DEFAULT_PROPS } from "../link";
import SkipLinks, { ISkipLinksProps } from "../index";

describe("<SkipLinks>", () => {
	let props: ISkipLinksProps;

	beforeEach(() => {
		props = {
			items: [
				{
					target: "#main-content",
					text: "Skip to Main Content",
				},
				{
					target: "#sidebar",
					text: "Skip to Side Menu",
				},
			],
		};
	});

	it("should render a link by default", () => {
		const component = render(<SkipLinks />);
		expect(component).toMatchSnapshot();
	});

	it("should render a link even if items is undefined", () => {
		const component = render(<SkipLinks items={[]} />);
		expect(component).toMatchSnapshot();
	});

	it("should render a list of skip links", () => {
		const component = render(<SkipLinks {...props} />);
		expect(component).toMatchSnapshot();
	});

	describe("<SkipLink>", () => {
		it("should render without error", () => {
			const component = render(<SkipLink {...SKIP_LINK_DEFAULT_PROPS} />);
			expect(component).toMatchSnapshot();
		});
	});
});
