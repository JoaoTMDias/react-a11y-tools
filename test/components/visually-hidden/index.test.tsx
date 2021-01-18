/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IVisuallyHiddenProps, VisuallyHidden } from "../../../src/components/visually-hidden/index";

describe("<VisuallyHidden>", () => {
	let props: IVisuallyHiddenProps;

	beforeEach(() => {
		props = {
			isFocusable: false,
		};
	});

	it("should render the visually hidden container", () => {
		const component = render(<VisuallyHidden {...props} />);
		expect(component).toMatchSnapshot();
	});

	it("should render children inside it", () => {
		render(
			<VisuallyHidden {...props}>
				<h2>A title</h2>
				<p>A paragraph</p>
				<ul>
					<li>
						<a href="#1">Link one</a>
					</li>
					<li>
						<a href="#2">Link two</a>
					</li>
				</ul>
			</VisuallyHidden>,
		);

		expect(screen.getByText("A title")).toBeInTheDocument();
		expect(screen.getByText("A paragraph")).toBeInTheDocument();

		screen.getAllByRole("link").forEach((item) => {
			const text = item.textContent;

			if (text) {
				expect(screen.getByText(text)).toBeInTheDocument();
			}
		});
	});

	it("should be able to receive focus", () => {
		render(
			<VisuallyHidden isFocusable={true}>
				<h2>A title</h2>
			</VisuallyHidden>,
		);

		userEvent.tab();

		expect(screen.getByTestId("visually-hidden-container")).toHaveFocus();
	});

	it("should not be able to receive focus", () => {
		render(
			<VisuallyHidden isFocusable={false}>
				<h2>A title</h2>
			</VisuallyHidden>,
		);

		userEvent.tab();

		expect(screen.getByTestId("visually-hidden-container")).not.toHaveAttribute("tabindex");
	});
});
