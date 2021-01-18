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
import { useSafeLayoutEffect } from "../../hooks/index";
import { IAuditProps } from "./index.d";
import "./styles.css";
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

const addClass = (className: string[]) => document.documentElement.classList.add(...className);
const removeClass = (className: string[]) => document.documentElement.classList.remove(...className);

/**
 * Accessibility Audit component
 * Tests the UI against common accessibility pitfalls and also enables
 * the developer to use the interface without a mouse pointer, simulate blurred vision, etc
 *
 * @param {IAuditProps} props
 */
export const Audit: FunctionComponent<IAuditProps> = (props) => {
	useSafeLayoutEffect(() => {
		const classes = classNames({
			"deprecated-elements": props.deprecatedElements,
			"deprecated-attributes": props.deprecatedAttributes,
			"images-src": props.imagesSrc,
			"images-alt": props.imagesAlt,
			"empty-href": props.emptyHref,
			"fieldset-legend": props.fieldsetLegend,
			"color-blindness-none": !props.colorBlindness,
			"color-blindness-blur": props.colorBlindness === "blur",
			"color-blindness-deuteranopia": props.colorBlindness === "deuteranopia",
			"color-blindness-deutranomaly": props.colorBlindness === "deutranomaly",
			"color-blindness-achromatomaly": props.colorBlindness === "achromatomaly",
			"color-blindness-achromatopsia": props.colorBlindness === "achromatopsia",
			"color-blindness-protanomaly": props.colorBlindness === "protanomaly",
			"color-blindness-protanopia": props.colorBlindness === "protanopia",
			"color-blindness-tritanomaly": props.colorBlindness === "tritanomaly",
			"color-blindness-tritanopia": props.colorBlindness === "tritanopia",
			"no-mouse": props.noMouse,
			"reduce-motion": props.reducedMotion,
			"large-font": props.largeFont,
			"i18n-lang": props.lang,
			"i18n-dir": props.dir,
			"nested-buttons": props.nestedButtons,
			title: props.title,
			"table-header": props.tableHeader,
			"table-single-row": props.tableSingleRow,
			"table-nested": props.tableNested,
			"table-deprecated-attributes": props.tableDeprecatedAttributes,
			"tab-index": props.tabIndex,
			list: props.list,
			headings: props.list,
		}).split(" ");
		addClass(classes);

		return () => {
			removeClass(classes);
		};
	}, [props]);

	return (
		<>
			<div data-testid="audit" />
			{props.colorBlindness && <SVGColorBlindnessFilters />}
		</>
	);
};

Audit.defaultProps = defaultProps;
