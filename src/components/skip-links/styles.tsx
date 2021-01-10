/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import styled from "styled-components";

const Link = styled.a`
	border-radius: 2.25rem;
	position: absolute;
	top: 0.5rem;
	left: 4rem;
	right: auto;
	display: flex;
	font-size: 0.75rem;
	font-weight: 700;
	height: 2.25rem;
	justify-content: center;
	letter-spacing: 1px;
	line-height: 2.25rem;
	opacity: 1;
	outline-color: var(--color-gray1, #ecedf0);
	padding: 0 0.5rem;
	position: fixed;
	right: 0;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: all 64ms ease-in-out;
	width: 12.5rem;
	z-index: 3;

	&:not(:focus) {
		border: 0;
		bottom: 0;
		clip-path: inset(50%);
		clip: rect(0 0 0 0);
		height: 1px;
		left: -624.9375rem;
		margin: -1px;
		opacity: 0;
		overflow: hidden;
		padding: 0;
		white-space: nowrap;
		width: 1px;
	}
`;

export default Link;
