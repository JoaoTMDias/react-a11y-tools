/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import styled from "styled-components";

export const Link = styled.a`
	--link-background: #111;
	--link-color: #fff;
	position: absolute;
	top: 1rem;
	left: 2rem;
	right: auto;
	font-size: 0.875rem;
	font-family: sans-serif;
	background: var(--link-background, #111);
	color: var(--link-color, #fff);
	display: flex;
	justify-content: center;
	letter-spacing: 0.5px;
	line-height: 2rem;
	padding: 0 1rem;
	text-align: center;
	text-decoration: none;
	height: 2rem;
	min-width: 10rem;
	z-index: 100;

	&:not(:focus) {
		border: 0;
		clip: rect(0 0 0 0);
		height: auto;
		margin: 0;
		overflow: hidden;
		padding: 0;
		position: absolute !important;
		width: 1px;
		white-space: nowrap;
	}
`;

export default Link;
