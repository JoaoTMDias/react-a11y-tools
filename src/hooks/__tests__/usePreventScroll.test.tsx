/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import { render } from "@testing-library/react";
import React from "react";
import { IPreventScrollOptions, usePreventScroll } from "../usePreventScroll/index";

function Example(props: IPreventScrollOptions) {
	usePreventScroll(props);
	return <div />;
}

describe("usePreventScroll", function () {
	it("should set overflow: hidden on the body on mount and remove on unmount", function () {
		// Before the mounting, there should be no overflow
		expect(document.documentElement).not.toHaveStyle("overflow: hidden");

		// Should have overflow applied
		const { unmount } = render(<Example />);
		expect(document.documentElement).toHaveStyle("overflow: hidden");

		// Unmounting the component removes the overflow again
		unmount();

		expect(document.documentElement).not.toHaveStyle("overflow: hidden");
	});

	it("should work with nested modals", function () {
		expect(document.documentElement).not.toHaveStyle("overflow: hidden");

		const { unmount: unmountFirstModal } = render(<Example />);
		expect(document.documentElement).toHaveStyle("overflow: hidden");

		const { unmount: unmountSecondModal } = render(<Example />);
		expect(document.documentElement).toHaveStyle("overflow: hidden");

		unmountSecondModal();
		expect(document.documentElement).toHaveStyle("overflow: hidden");

		unmountFirstModal();
		expect(document.documentElement).not.toHaveStyle("overflow: hidden");
	});

	it("should remove overflow: hidden when isDisabled option is true", function () {
		expect(document.documentElement).not.toHaveStyle("overflow: hidden");

		const { rerender } = render(<Example />);
		expect(document.documentElement).toHaveStyle("overflow: hidden");

		rerender(<Example isDisabled />);
		expect(document.documentElement).not.toHaveStyle("overflow: hidden");
	});
});
