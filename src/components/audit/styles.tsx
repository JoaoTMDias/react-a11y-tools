/* istanbul ignore file */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import { createGlobalStyle, css } from "styled-components";
import { IAuditProps } from "./index.d";

const errorLabel = (content: string, top: number | string = 0, position = "relative") => {
	return css`
		&:after {
			content: ${`"${content}"`};
			position: ${position};
			top: ${top};
			left: 0;
			letter-spacing: 0.25px;
			padding: 4px 8px;
			background: black;
			color: white;
			font-size: 12px;
			font-family: monospace;
			border-radius: 2rem;
		}
	`;
};

export const Global = createGlobalStyle<IAuditProps>`
	${({ deprecatedElements }) =>
		deprecatedElements &&
		css`
			applet,
			basefont,
			center,
			dir,
			font,
			isindex,
			menu,
			s,
			strike,
			u {
				display: inline-block;
				position: relative;

				${errorLabel("Deprecated HTML Element")}
			}
		`}

	${({ deprecatedAttributes }) =>
		deprecatedAttributes &&
		css`
			*[background],
			*[bgcolor],
			*[clear],
			*[color],
			*[compact],
			*[noshade],
			*[nowrap],
			*[size],
			*[start],
			*[bottommargin],
			*[leftmargin],
			*[rightmargin],
			*[topmargin],
			*[marginheight],
			*[marginwidth],
			*[alink],
			*[link],
			*[text],
			*[vlink],
			*[align],
			*[valign],
			*[hspace],
			*[vspace],
			*[height],
			*[width],
			ul[type],
			ol[type],
			li[type] {
				${errorLabel("Deprecated attribute")}
			}
		`}

	${({ imagesSrc }) =>
		imagesSrc &&
		css`
			outline: 2px dotted tomato;
			outline-offset: 2px;
		`}

	${({ imagesAlt }) =>
		imagesAlt &&
		css`
			img:not([alt]),
			area:not([alt]),
			*[role="img"]:not([aria-label]),
			input[type="image"][alt=""],
			input[type="image"]:not([alt]) {
				outline: 2px dashed tomato;
				outline-offset: 2px;
			}

			img:not([alt]),
			area:not([alt]),
			input[type="image"][alt=""],
			input[type="image"]:not([alt]) {
				${errorLabel("No alt attribute")}
			}

			/* something that has a role of image but no alternative */
			*[role="img"]:not([aria-label]) {
				${errorLabel("No alternative description")}
			}
		`}

	${({ emptyHref }) =>
		emptyHref &&
		css`
			a:not([href]),
			a[href=""],
			a[href=" "],
			a[href="#"],
			a[href*="javascript\:"],
			a:not([href])[onclick] {
				outline: 2px dotted tomato;

				${errorLabel("Missing valid href attribute")}
			}
		`}

	${({ fieldsetLegend }) =>
		fieldsetLegend &&
		css`
			fieldset {
				/* no other element than a legend can be first child of a fieldset element */
				> :not(legend):first-child,
			/* and a legend can't be anything else than first child of a fieldset element */
			> legend:not(:first-child) {
					${errorLabel("invalid fieldset markup")}
				}
			}
		`}

	${({ colorBlindness }) => {
		switch (colorBlindness) {
			case "blur":
				return css`
					html {
						filter: blur(2px) !important;
					}
				`;

			case "deuteranopia":
			case "deutranomaly":
			case "achromatomaly":
			case "achromatopsia":
			case "protanomaly":
			case "protanopia":
			case "tritanomaly":
			case "tritanopia":
				return css`
					html {
						filter: ${`url(#${colorBlindness}) !important`};

						${errorLabel(`color blindness: ${colorBlindness}`, 0, "fixed")}
					}
				`;

			default:
				return css`
					html {
						filter: "none"
				`;
		}
	}}

	${({ noMouse }) =>
		noMouse &&
		css`
			*,
			*:hover {
				cursor: none !important;
			}
		`}

	${({ reducedMotion }) =>
		reducedMotion &&
		css`
			*,
			*:hover,
			*:focus {
				transition: none !important;
				animation: none !important;
			}
		`}

	${({ largeFont }) =>
		largeFont &&
		css`
			html {
				font-size: 32px;
			}
		`}

	${({ lang }) =>
		lang &&
		css`
			html:not([lang]),
			html[lang=" "],
			html[lang=""],
			html:not(:lang(en)) {
				outline: 2px dotted tomato;
				outline-offset: 2px;

				${errorLabel("Missing 'lang' attribute in html element", 0, "fixed")}
			}
		`}

	${({ dir }) =>
		dir &&
		css`
			/* If used, dir attribute only accepts 2 possible values */
			[dir]:not([dir="rtl"]):not([dir="ltr"]) {
				${errorLabel("dir attribute has invalid value")}
			}
		`}

	${({ nestedButtons }) =>
		nestedButtons &&
		css`
			a button,
			button a {
				outline: 2px dotted tomato;
				outline-offset: 2px;
			}
		`}

	${({ title }) =>
		title &&
		css`
			/* Inline frames without title attribute */
			iframe:not([title]) {
				${errorLabel("iframe has no title")}
			}

			/* empty? */
			title:empty {
				${errorLabel("title element is empty")}
			}
		`}

	${({ tableHeader }) =>
		tableHeader &&
		css`
			/* Empty Header Cells */
			th:empty {
				${errorLabel("Replace empty TH element with TD")}
			}
		`}

	${({ tableSingleRow }) =>
		tableSingleRow &&
		css`
			/* only one TR in the table. Is that a layout table? */
			table > tr:only-child,
			table > tbody > tr:only-child {
				${errorLabel("Only one TR in this table")}
			}
		`}

	${({ tableNested }) =>
		tableNested &&
		css`
			/* test for nested table */
			th > table,
			td > table,
			body > table:first-child,
			table table {
				${errorLabel("Nested table found")}
			}
		`}

	${({ tableDeprecatedAttributes }) =>
		tableDeprecatedAttributes &&
		css`
			/* Deprecated attributes on table */
			table[align],
			table[bgcolor],
			table[border],
			table[cellpadding],
			table[cellspacing],
			table[width],
			td[width],
			td[valign] {
				${errorLabel("Deprecated markup in table")}
			}
		`}

	${({ tabIndex }) =>
		tabIndex &&
		css`
			[tabindex]:not([tabindex="0"]):not([tabindex="-1"]) {
				outline: 2px dotted tomato;

				${errorLabel("tabindex must be 0 or -1")}
			}
		`}

	${({ list }) =>
		list &&
		css`
			/* bullet type should be declared in CSS */
			ol[type]:after,
			ul[type]:after {
				content: "ERROR: Bullet type should be declared in CSS" !important;
			}

			ol > *:not(li):after,
			ul > *:not(li):after {
				content: "ERROR: List markup invalid" !important;
			}
		`}

${({ headings }) =>
		headings &&
		css`
		h1 {
			${errorLabel("h1")}
		}

		h2 {
			${errorLabel("h2")}
		}

		h3 {
			${errorLabel("h3")}
		}

		h4 {
			${errorLabel("h4")}
		}

		h5 {
			${errorLabel("h5")}
		}

		h6 {
			${errorLabel("h6")}
		}
	`}
`;
