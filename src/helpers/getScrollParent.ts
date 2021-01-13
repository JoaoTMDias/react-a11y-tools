/* istanbul ignore file */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
function isScrollable(node: HTMLElement): boolean {
	const style = window.getComputedStyle(node);
	return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}

/**
 * Returns the parent element of the scrolling element
 *
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
export function getScrollParent(node: HTMLElement): HTMLElement {
	while (node && !isScrollable(node)) {
		node = node.parentElement || node;
	}

	return node || document.scrollingElement || document.documentElement;
}
