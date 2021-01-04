/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
export interface IAuditDeprecated {
	/**
	 * Deprecated HTML elements
	 */
	elements?: boolean;

	/**
	 * Disables Attributes
	 */
	attributes?: boolean;
}

export interface IAuditEmulate {
	/**
	 * Disables the mouse pointer
	 */
	noMouse?: boolean;

	/**
	 * Simulates types of color blindness
	 */
	colorBlindness?:
		| "protanopia"
		| "protanomaly"
		| "deuteranopia"
		| "deutranomaly"
		| "tritanopia"
		| "tritanomaly"
		| "achromatopsia"
		| "achromatomaly"
		| "blur"
		| null;

	/**
	 * Simulates no animations or transitions
	 */
	reducedMotion?: boolean;

	/**
	 * Simulates Large font-size
	 */
	largeFont?: boolean;
}

export interface IAuditTable {
	/**
	 * Empty Header Cells
	 */
	tableHeader?: boolean;

	/**
	 * Nested Tables.
	 */
	nestedTable?: boolean;

	/**
	 * Only one TR in the table. Is that a layout table?
	 */
	singleRow?: boolean;

	/**
	 * Deprecated attributes on table
	 */
	deprecated?: boolean;
}

export interface IAuditImages {
	/**
	 * Finds img, area or role="img" elements without alt attributes
	 */
	alt?: boolean;

	/**
	 * Finds images without src attribute
	 */
	src?: boolean;
}

export interface IAuditForms {
	/**
	 * Valid fieldset
	 */
	fieldsetLegend?: boolean;
}

export interface IAuditInternationalization {
	/**
	 * Missing `lang` attribute
	 */
	lang?: boolean;

	/**
	 * `dir` attribute only accepts left or right layouts
	 */
	dir?: boolean;
}

export interface IAuditProps {
	/**
	 * Deprecated HTML elements
	 */
	deprecatedElements?: IAuditDeprecated["elements"];

	/**
	 * Disables Attributes
	 */
	deprecatedAttributes?: IAuditDeprecated["attributes"];

	/**
	 * Finds images without src attribute
	 */
	imagesSrc?: IAuditImages["src"];

	/**
	 * Finds img, area or role="img" elements without alt attributes
	 */
	imagesAlt?: IAuditImages["alt"];

	/**
	 * Points out links with empty href's
	 */
	emptyHref?: boolean;

	/**
	 * Disables the mouse pointer
	 */
	noMouse?: boolean;

	/**
	 * Simulates types of color blindness
	 */
	colorBlindness?: IAuditEmulate["colorBlindness"];

	/**
	 * Simulates no animations or transitions
	 */
	reducedMotion?: IAuditEmulate["reducedMotion"];

	/**
	 * Simulates Large font-size
	 */
	largeFont?: IAuditEmulate["largeFont"];

	/**
	 * Valid fieldset
	 */
	fieldsetLegend?: IAuditForms["fieldsetLegend"];

	/**
	 * Missing `lang` attribute
	 */
	lang?: IAuditInternationalization["lang"];

	/**
	 * `dir` attribute only accepts left or right layouts
	 */
	dir?: IAuditInternationalization["dir"];

	/**
	 * Missing or invalid title attributes
	 */
	title?: boolean;

	/**
	 * Empty Header Cells
	 */
	tableHeader?: IAuditTable["tableHeader"];

	/**
	 * Nested Tables.
	 */
	tableNested?: IAuditTable["nestedTable"];

	/**
	 * Only one TR in the table. Is that a layout table?
	 */
	tableSingleRow?: IAuditTable["singleRow"];

	/**
	 * Deprecated attributes on table
	 */
	tableDeprecatedAttributes?: IAuditTable["deprecated"];

	/**
	 * Buttons inside links or links inside buttons
	 */
	nestedButtons?: boolean;

	/**
	 * List-related
	 */
	list?: boolean;

	/**
	 * `tabIndex`
	 */
	tabIndex?: boolean;
}
