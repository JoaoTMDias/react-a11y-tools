/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import classNames from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

export interface IVisuallyHiddenProps {
	/** Whether the element should become visible on focus, for example skip links. */
	isFocusable?: boolean;
}

/**
 * VisuallyHidden hides its children visually, while keeping content visible
 * to screen readers.
 *
 * @param {FunctionComponent<VisuallyHiddenProps>} props
 * @returns {JSX.Element}
 */
export const VisuallyHidden: FunctionComponent<IVisuallyHiddenProps> = ({ children, isFocusable }) => {
	const tabIndex = isFocusable ? 0 : undefined;
	const classes = classNames(styles["sr-only"], "visually-hidden");

	return (
		<div className={classes} data-testid="visually-hidden-container" tabIndex={tabIndex}>
			{children}
		</div>
	);
};
