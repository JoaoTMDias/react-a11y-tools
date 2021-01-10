/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import React, { FunctionComponent, JSXElementConstructor } from "react";
import Container from "./styles";

export interface IVisuallyHiddenProps {
	/**
	 * The element type for the container.
	 * @default 'div'
	 */
	as?: string | JSXElementConstructor<any>;

	/** Whether the element should become visible on focus, for example skip links. */
	isFocusable?: boolean;
}

export const defaultProps: Partial<IVisuallyHiddenProps> = {
	as: "div",
	isFocusable: false,
};

/**
 * VisuallyHidden hides its children visually, while keeping content visible
 * to screen readers.
 *
 * @param {FunctionComponent<VisuallyHiddenProps>} props
 * @returns {JSX.Element}
 */
const VisuallyHidden: FunctionComponent<IVisuallyHiddenProps> = ({ children, as, isFocusable }) => {
	const tabIndex = isFocusable ? 0 : undefined;

	return (
		<Container as={as} className="visually-hidden" data-testid="visually-hidden-container" tabIndex={tabIndex}>
			{children}
		</Container>
	);
};

VisuallyHidden.defaultProps = defaultProps;

export default VisuallyHidden;
