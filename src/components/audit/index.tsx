/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */

import React, { FunctionComponent } from "react";
import { IAuditProps } from "./index.d";
import { Global } from "./styles";
import SVGColorBlindnessFilters from "./svg-filters";

export const defaultProps = {
	deprecatedElements: true,
	deprecatedAttributes: true,
	imagesSrc: true,
	imagesAlt: true,
	emptyHref: true,
	fieldsetLegend: true,
	colorBlindness: undefined,
	noMouse: false,
	reducedMotion: false,
	largeFont: false,
	lang: true,
	dir: true,
	title: true,
	tableHeader: true,
	tableNested: true,
	tableSingleRow: true,
	tableDeprecatedAttributes: true,
	list: true,
	nestedButtons: true,
	tabIndex: true,
	headings: true,
};

/**
 * Accessibility Audit component
 * Tests the UI against common accessibility pitfalls and also enables
 * the developer to use the interface without a mouse pointer, simulate blurred vision, etc
 *
 * @param {IAuditProps} props
 */
export const Audit: FunctionComponent<IAuditProps> = (props) => {
	return (
		<>
			<Global {...props} />
			{props.colorBlindness && <SVGColorBlindnessFilters />}
		</>
	);
};

Audit.defaultProps = defaultProps;
