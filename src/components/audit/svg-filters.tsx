/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import React, { FunctionComponent } from "react";

/**
 * Collection of SVG Color Matrix filters that simulate color blindness
 */
const SVGColorBlindnessFilters: FunctionComponent = () => {
	return (
		<svg height="0" data-testid="audit-svg-filter">
			<filter id="protanopia">
				<feColorMatrix
					type="matrix"
					values=".56667 .43333 0 0 0 .55833 .44167 0 0 0 0 .24167 .75833 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
			<filter id="protanomaly">
				<feColorMatrix
					type="matrix"
					values=".81667 .18333 0 0 0 .33333 .66667 0 0 0 0 .125 .875 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
			<filter id="deuteranopia">
				<feColorMatrix type="matrix" values=".625 .375 0 0 0 .7 .3 0 0 0 0 .3 .7 0 0 0 0 0 1 0"></feColorMatrix>
			</filter>
			<filter id="deutranomaly">
				<feColorMatrix
					type="matrix"
					values=".8 .2 0 0 0 .25833 .74167 0 0 0 0 .14167 .85833 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
			<filter id="tritanopia">
				<feColorMatrix
					type="matrix"
					values=".95 .5 0 0 0 0 .43333 .56667 0 0 0 .475 .525 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
			<filter id="tritanomaly">
				<feColorMatrix
					type="matrix"
					values=".96667 .3333 0 0 0 0 .73333 .26667 0 0 0 .18333 .81667 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
			<filter id="achromatopsia">
				<feColorMatrix
					type="matrix"
					values=".299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
			<filter id="achromatomaly">
				<feColorMatrix
					type="matrix"
					values=".618 .32 .62 0 0 .163 .775 .62 0 0 .163 .320 .516 0 0 0 0 0 1 0"
				></feColorMatrix>
			</filter>
		</svg>
	);
};

export default SVGColorBlindnessFilters;
