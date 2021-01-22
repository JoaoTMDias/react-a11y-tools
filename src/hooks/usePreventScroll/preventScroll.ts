/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import { chain, getScrollParent } from "../../helpers/index";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const visualViewport = typeof window !== "undefined" && window.visualViewport;

// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset",
]);

/**
 * Sets a CSS property on an element, and returns a function to revert it to the previous value.
 *
 * @param {HTMLElement} element
 * @param {string} style
 * @param {string} value
 * @returns {() => void}
 */
function setStyle(element: HTMLElement, style: string, value: string): () => void {
	const current = element.style[style as any];
	element.style[style as any] = value;
	return () => {
		element.style[style as any] = current;
	};
}

/* istanbul ignore next */
/**
 * Adds an event listener to an element, and returns a function to remove it.
 *
 * @template K
 * @param {EventTarget} target
 * @param {K} event
 * @param {(this: Document, evt: GlobalEventHandlersEventMap[K]) => any} handler
 * @param {(boolean | AddEventListenerOptions)} [options]
 * @returns
 */
function addEvent<K extends keyof GlobalEventHandlersEventMap>(
	target: EventTarget,
	event: K,
	handler: (this: Document, evt: GlobalEventHandlersEventMap[K]) => any,
	options?: boolean | AddEventListenerOptions,
) {
	target.addEventListener(event, handler as any, options);
	return () => {
		target.removeEventListener(event, handler as any, options);
	};
}

/* istanbul ignore next */
/**
 * Find the parent scrollable element and adjust the scroll position if the target is not already in view.
 *
 * @param {HTMLElement} target
 * @returns {void}
 */
function scrollIntoView(target: HTMLElement): void {
	const scrollable = getScrollParent(target);

	if (scrollable !== document.documentElement && scrollable !== document.body) {
		const scrollableTop = scrollable.getBoundingClientRect().top;
		const targetTop = target.getBoundingClientRect().top;

		if (targetTop > scrollableTop + target.clientHeight) {
			scrollable.scrollTop += targetTop - scrollableTop;
		}
	}
}

/**
 * For most browsers, all we need to do is set `overflow: hidden` on the root element, and
 * add some padding to prevent the page from shifting when the scrollbar is hidden.
 *
 * @returns {(...args: any[]) => void}
 */
export function preventScrollStandard(): (...args: any[]) => void {
	return chain(
		setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`),
		setStyle(document.documentElement, "overflow", "hidden"),
	);
}

/* istanbul ignore next */
/**
 * Mobile Safari is a whole different beast. Even with overflow: hidden, it still scrolls the page in many situations:
 * 1. When the bottom toolbar and address bar are collapsed, page scrolling is always allowed.
 * 2. When the keyboard is visible, the viewport does not resize. Instead, the keyboard covers part of
 * it, so it becomes scrollable.
 * 3. When tapping on an input, the page always scrolls so that the input is centered in the visual viewport.
 * This may cause even fixed position elements to scroll off the screen.
 * 4. When using the next/previous buttons in the keyboard to navigate between inputs, the whole page always
 * scrolls, even if the input is inside a nested scrollable element that could be scrolled instead.
 *
 * In order to work around these cases, and prevent scrolling without jankiness, we do a few things:
 * 1. Prevent default on `touchmove` events that are not in a scrollable element. This prevents touch scrolling
 * on the window.
 * 2. Prevent default on `touchmove` events inside a scrollable element when the scroll position is at the
 * top or bottom. This avoids the whole page scrolling instead, but does prevent overscrolling.
 * 3. Prevent default on `touchend` events on input elements and handle focusing the element ourselves.
 * 4. When focusing an input, apply a transform to trick Safari into thinking the input is at the top
 * of the page, which prevents it from scrolling the page. After the input is focused, scroll the element
 * into view ourselves, without scrolling the whole page.
 * 5. Offset the body by the scroll position using a negative margin and scroll to the top. This should appear the
 * same visually, but makes the actual scroll position always zero. This is required to make all of the
 * above work or Safari will still try to scroll the page when focusing an input.
 * 6. As a last resort, handle window scroll events, and scroll back to the top. This can happen when attempting
 * to navigate to an input with the next/previous buttons that's outside a modal.
 *
 * @returns {() => void}
 */
export function preventScrollMobileSafari(): () => void {
	let scrollable: HTMLElement;
	let lastY = 0;

	const onTouchStart = (event: TouchEvent) => {
		// Store the nearest scrollable parent element from the element that the user touched.
		scrollable = getScrollParent(event.target as HTMLElement);
		if (scrollable === document.documentElement && scrollable === document.body) {
			return;
		}

		lastY = event.changedTouches[0].pageY;
	};

	const onTouchMove = (event: TouchEvent) => {
		// Prevent scrolling the window.
		if (scrollable === document.documentElement || scrollable === document.body) {
			event.preventDefault();
			return;
		}

		// Prevent scrolling up when at the top and scrolling down when at the bottom
		// of a nested scrollable area, otherwise mobile Safari will start scrolling
		// the window instead. Unfortunately, this disables bounce scrolling when at
		// the top but it's the best we can do.
		const y = event.changedTouches[0].pageY;
		const scrollTop = scrollable.scrollTop;
		const bottom = scrollable.scrollHeight - scrollable.clientHeight;

		if ((scrollTop <= 0 && y > lastY) || (scrollTop >= bottom && y < lastY)) {
			event.preventDefault();
		}

		lastY = y;
	};

	const onTouchEnd = (event: TouchEvent) => {
		const target = event.target as HTMLElement;

		if (target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type)) {
			event.preventDefault();

			// Apply a transform to trick Safari into thinking the input is at the top of the page
			// so it doesn't try to scroll it into view. When tapping on an input, this needs to
			// be done before the "focus" event, so we have to focus the element ourselves.
			target.style.transform = "translateY(-2000px)";
			target.focus();
			requestAnimationFrame(() => {
				target.style.transform = "";
			});
		}
	};

	const onFocus = (event: FocusEvent) => {
		const target = event.target as HTMLElement;

		if (target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type)) {
			// Transform also needs to be applied in the focus event in cases where focus moves
			// other than tapping on an input directly, e.g. the next/previous buttons in the
			// software keyboard. In these cases, it seems applying the transform in the focus event
			// is good enough, whereas when tapping an input, it must be done before the focus event.
			target.style.transform = "translateY(-2000px)";
			requestAnimationFrame(() => {
				target.style.transform = "";

				// This will have prevented the browser from scrolling the focused element into view,
				// so we need to do this ourselves in a way that doesn't cause the whole page to scroll.
				if (visualViewport) {
					if (visualViewport.height < window.innerHeight) {
						// If the keyboard is already visible, do this after one additional frame
						// to wait for the transform to be removed.
						requestAnimationFrame(() => {
							scrollIntoView(target);
						});
					} else {
						// Otherwise, wait for the visual viewport to resize before scrolling so we can
						// measure the correct position to scroll to.
						visualViewport.addEventListener("resize", () => scrollIntoView(target), { once: true });
					}
				}
			});
		}
	};

	const onWindowScroll = () => {
		// Last resort. If the window scrolled, scroll it back to the top.
		// It should always be at the top because the body will have a negative margin (see below).
		window.scrollTo(0, 0);
	};

	// Record the original scroll position so we can restore it.
	// Then apply a negative margin to the body to offset it by the scroll position. This will
	// enable us to scroll the window to the top, which is required for the rest of this to work.
	const scrollX = window.pageXOffset;
	const scrollY = window.pageYOffset;
	const restoreStyles = chain(
		setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`),
		setStyle(document.documentElement, "overflow", "hidden"),
		setStyle(document.body, "marginTop", `-${scrollY}px`),
	);

	// Scroll to the top. The negative margin on the body will make this appear the same.
	window.scrollTo(0, 0);

	const removeEvents = chain(
		addEvent(document, "touchstart", onTouchStart, { passive: false, capture: true }),
		addEvent(document, "touchmove", onTouchMove, { passive: false, capture: true }),
		addEvent(document, "touchend", onTouchEnd, { passive: false, capture: true }),
		addEvent(document, "focus", onFocus, true),
		addEvent(window, "scroll", onWindowScroll),
	);

	return () => {
		// Restore styles and scroll the page back to where it was.
		restoreStyles();
		removeEvents();
		window.scrollTo(scrollX, scrollY);
	};
}