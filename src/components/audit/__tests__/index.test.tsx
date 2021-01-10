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
import React from "react";
import { defaultProps } from "../index";
import { IAuditProps } from "../index.d";
import AuditInPage from "../mocks/AuditInPage";

describe("<Audit>", () => {
	let props: IAuditProps;

	beforeEach(() => {
		props = {
			...defaultProps,
		};
	});

	it("should render the Audit component", () => {
		const component = render(<AuditInPage {...props} />);
		expect(component).toMatchSnapshot();
	});

	it("should render the SVG filter component", () => {
		const customProps: IAuditProps = {
			...props,
			colorBlindness: "achromatomaly",
		};

		render(<AuditInPage {...customProps} colorBlindness={customProps.colorBlindness} />);

		expect(screen.getByTestId("audit-svg-filter")).toBeInTheDocument();
	});
});
