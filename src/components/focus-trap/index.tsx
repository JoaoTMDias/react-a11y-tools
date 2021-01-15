/* eslint-disable consistent-return */
/* istanbul ignore file */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import React, { ReactNode, RefObject, useContext, useEffect, useRef } from "react";
import { useSafeLayoutEffect } from "../../hooks/index";
import { focusSafely } from "./focus-safely";

export interface IFocusTrapProps {
	/** The contents of the focus scope. */
	children: ReactNode;

	/**
	 * Whether to contain focus inside the scope, so users cannot
	 * move focus outside, for example in a modal dialog.
	 */
	contain?: boolean;

	/**
	 * Whether to restore focus back to the element that was focused
	 * when the focus scope mounted, after the focus scope unmounts.
	 */
	restoreFocus?: boolean;

	/** Whether to auto focus the first focusable element in the focus scope on mount. */
	autoFocus?: boolean;
}

export interface IFocusManagerOptions {
	/** The element to start searching from. The currently focused element by default. */
	from?: HTMLElement;
	/** Whether to only include tabbable elements, or all focusable elements. */
	tabbable?: boolean;
	/** Whether focus should wrap around when it reaches the end of the scope. */
	wrap?: boolean;
}

export interface IFocusManager {
	/** Moves focus to the next focusable or tabbable element in the focus scope. */
	focusNext(opts?: IFocusManagerOptions): HTMLElement | undefined;
	/** Moves focus to the previous focusable or tabbable element in the focus scope. */
	focusPrevious(opts?: IFocusManagerOptions): HTMLElement | undefined;
}

export interface IUseRestoreFocus {
	scopeRef: RefObject<HTMLElement[]>;
	restoreFocus?: boolean;
	contain?: boolean;
}

const FocusContext = React.createContext<IFocusManager | null>(null);

let activeScope: RefObject<HTMLElement[]> | null = null;
const scopes: Set<RefObject<HTMLElement[]>> = new Set();

// This is a hacky DOM-based implementation of a FocusTrap until this RFC lands in React:
// https://github.com/reactjs/rfcs/pull/109
// For now, it relies on the DOM tree order rather than the React tree order, and is probably
// less optimized for performance.

/**
 * A FocusTrap manages focus for its descendants. It supports containing focus inside
 * the scope, restoring focus to the previously focused element on unmount, and auto
 * focusing children on mount. It also acts as a container for a programmatic focus
 * management interface that can be used to move focus forward and back in response
 * to user events.
 */
export function FocusTrap({ children, contain, restoreFocus, autoFocus }: IFocusTrapProps): JSX.Element {
	const startRef = useRef<HTMLSpanElement>(null);
	const endRef = useRef<HTMLSpanElement>(null);
	const scopeRef = useRef<HTMLElement[]>([]);

	useSafeLayoutEffect(() => {
		// Find all rendered nodes between the sentinels and add them to the scope.
		let node = startRef?.current?.nextSibling;
		const nodes = [];
		while (node && node !== endRef.current) {
			nodes.push(node);
			node = node.nextSibling;
		}

		scopeRef.current = nodes as HTMLElement[];
		scopes.add(scopeRef);
		return () => {
			scopes.delete(scopeRef);
		};
	}, [children]);

	useFocusContainment(scopeRef, contain);
	useRestoreFocus({
		scopeRef,
		restoreFocus,
		contain,
	});
	useAutoFocus(scopeRef, autoFocus);

	const focusManager = createFocusManager(scopeRef);

	return (
		<FocusContext.Provider value={focusManager}>
			<span hidden ref={startRef} />
			{children}
			<span hidden ref={endRef} />
		</FocusContext.Provider>
	);
}

/**
 * Returns a FocusManager interface for the parent FocusTrap.
 * A FocusManager can be used to programmatically move focus within
 * a FocusTrap, e.g. in response to user events like keyboard navigation.
 *
 * @export
 * @returns {IFocusManager | null}
 */
export function useFocusManager(): IFocusManager | null {
	const ctx = useContext(FocusContext);

	return ctx;
}

/**
 *
 *
 * @param {React.RefObject<HTMLElement[]>} scopeRef
 * @returns {IFocusManager}
 */
function createFocusManager(scopeRef: React.RefObject<HTMLElement[]>): IFocusManager {
	return {
		focusNext(opts: IFocusManagerOptions = {}): HTMLElement | undefined {
			const node = opts.from || document.activeElement;
			const focusable = getFocusableElementsInScope(scopeRef.current, opts);
			let nextNode = focusable.find(
				(n) =>
					!!(
						node &&
						node.compareDocumentPosition(n) & (Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY)
					),
			);
			if (!nextNode && opts.wrap) {
				nextNode = focusable[0];
			}
			if (nextNode) {
				nextNode.focus();
				return nextNode;
			}

			return undefined;
		},

		focusPrevious(opts: IFocusManagerOptions = {}): HTMLElement | undefined {
			const node = opts.from || document.activeElement;
			const focusable = getFocusableElementsInScope(scopeRef.current, opts).reverse();
			let previousNode = focusable.find(
				(n) =>
					!!(
						node &&
						node.compareDocumentPosition(n) & (Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINED_BY)
					),
			);
			if (!previousNode && opts.wrap) {
				previousNode = focusable[0];
			}
			if (previousNode) {
				previousNode.focus();
				return previousNode;
			}

			return undefined;
		},
	};
}

const focusableElements = [
	"input:not([disabled]):not([type=hidden])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"a[href]",
	"area[href]",
	"summary",
	"iframe",
	"object",
	"embed",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]",
];

const FOCUSABLE_ELEMENT_SELECTOR = focusableElements.join(",") + ",[tabindex]";

focusableElements.push('[tabindex]:not([tabindex="-1"])');
const TABBABLE_ELEMENT_SELECTOR = focusableElements.join(':not([tabindex="-1"]),');

function getFocusableElementsInScope(scope: HTMLElement[] | null, opts: IFocusManagerOptions): HTMLElement[] {
	const res: HTMLElement[] = [];
	const selector = opts.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

	if (scope) {
		for (const node of scope) {
			if (node.matches(selector)) {
				res.push(node);
			}

			const selectors: HTMLElement[] = Array.from(node.querySelectorAll(selector));

			res.push(...selectors);
		}
	}
	return res;
}

/**
 *
 *
 * @param {RefObject<HTMLElement[]>} scopeRef
 * @param {boolean} [contain]
 */
function useFocusContainment(scopeRef: RefObject<HTMLElement[]>, contain?: boolean): void {
	const focusedNode = useRef<HTMLElement>();

	const raf = useRef<number | null>(null);
	useEffect(() => {
		const scope = scopeRef.current;
		if (!contain) {
			return;
		}

		// Handle the Tab key to contain focus within the scope
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Tab" || event.altKey || event.ctrlKey || event.metaKey) {
				return;
			}

			const focusedElement = document.activeElement as HTMLElement;
			if (!isElementInScope(focusedElement, scope)) {
				return;
			}

			const elements = getFocusableElementsInScope(scope, { tabbable: true });
			const position = elements.indexOf(focusedElement);
			const lastPosition = elements.length - 1;
			let nextElement = null;

			if (event.shiftKey) {
				if (position <= 0) {
					nextElement = elements[lastPosition];
				} else {
					nextElement = elements[position - 1];
				}
			} else {
				if (position === lastPosition) {
					nextElement = elements[0];
				} else {
					nextElement = elements[position + 1];
				}
			}

			event.preventDefault();

			if (nextElement) {
				focusElement(nextElement, true);
			}
		};

		/**
		 * If a focus event occurs outside the active scope (e.g. user tabs from browser location bar),
		 * restore focus to the previously focused node or the first tabbable element in the active scope.
		 * @param {any} ev
		 */
		const onFocus = (ev: any) => {
			const isInAnyScope = isElementInAnyScope(ev.target, scopes);

			if (!isInAnyScope) {
				if (focusedNode.current) {
					focusedNode.current.focus();
				} else if (activeScope) {
					focusFirstInScope(activeScope.current);
				}
			} else {
				activeScope = scopeRef;
				focusedNode.current = ev.target;
			}
		};

		/**
		 *
		 * @param event
		 */
		const onBlur = (event: any) => {
			raf.current = requestAnimationFrame(() => {
				// Use document.activeElement instead of e.relatedTarget so we can tell if user clicked into iframe
				const isInAnyScope = isElementInAnyScope(document.activeElement, scopes);

				if (!isInAnyScope) {
					activeScope = scopeRef;
					focusedNode.current = event.target;
					focusedNode?.current?.focus();
				}
			});
		};

		document.addEventListener("keydown", onKeyDown, false);
		document.addEventListener("focusin", onFocus, false);
		scope?.forEach((element) => element.addEventListener("focusin", onFocus, false));
		scope?.forEach((element) => element.addEventListener("focusout", onBlur, false));

		return () => {
			document.removeEventListener("keydown", onKeyDown, false);
			document.removeEventListener("focusin", onFocus, false);
			scope?.forEach((element) => element.removeEventListener("focusin", onFocus, false));
			scope?.forEach((element) => element.removeEventListener("focusout", onBlur, false));
		};
	}, [scopeRef, contain]);

	// eslint-disable-next-line arrow-body-style
	useEffect(() => {
		return () => {
			if (raf.current) {
				return cancelAnimationFrame(raf.current);
			}
		};
	}, [raf]);
}

/**
 *
 *
 * @param {(Element | null)} element
 * @param {Set<RefObject<HTMLElement[]>>} scopes
 * @returns {boolean}
 */
function isElementInAnyScope(element: Element | null, scopes: Set<RefObject<HTMLElement[]>>) {
	for (const scope of scopes.values()) {
		if (isElementInScope(element, scope.current)) {
			return true;
		}
	}
	return false;
}

/**
 *
 *
 * @param {(Element | null)} element
 * @param {(HTMLElement[] | null)} scope
 * @returns {boolean}
 */
function isElementInScope(element: Element | null, scope: HTMLElement[] | null) {
	return scope?.some((node) => node.contains(element));
}

/**
 *
 *
 * @param {(HTMLElement | null)} element
 * @param {boolean} [scroll=false]
 */
function focusElement(element: HTMLElement | null, scroll = false) {
	if (element != null && !scroll) {
		try {
			focusSafely(element);
		} catch (err) {
			// ignore
		}
	} else if (element != null) {
		try {
			element.focus();
		} catch (err) {
			// ignore
		}
	}
}

/**
 * @param {(HTMLElement[] | null)} scope
 */
function focusFirstInScope(scope: HTMLElement[] | null) {
	const elements = getFocusableElementsInScope(scope, { tabbable: true });
	focusElement(elements[0]);
}

/**
 * @param {RefObject<HTMLElement[]>} scopeRef
 * @param {boolean} [autoFocus]
 */
function useAutoFocus(scopeRef: RefObject<HTMLElement[]>, autoFocus?: boolean) {
	useEffect(() => {
		if (autoFocus) {
			activeScope = scopeRef;
			if (!isElementInScope(document.activeElement, activeScope.current)) {
				focusFirstInScope(scopeRef.current);
			}
		}
	}, [scopeRef, autoFocus]);
}

/**
 *
 *
 * @param {IUseRestoreFocus} props
 */
function useRestoreFocus({ scopeRef, restoreFocus, contain }: IUseRestoreFocus): void {
	useSafeLayoutEffect(() => {
		const scope = scopeRef.current;
		const nodeToRestore = document.activeElement as HTMLElement;

		// Handle the Tab key so that tabbing out of the scope goes to the next element
		// after the node that had focus when the scope mounted. This is important when
		// using portals for overlays, so that focus goes to the expected element when
		// tabbing out of the overlay.
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey) {
				return;
			}

			const focusedElement = document.activeElement as HTMLElement;
			if (!isElementInScope(focusedElement, scope)) {
				return;
			}

			// Create a DOM tree walker that matches all tabbable elements
			const walker = getFocusableTreeWalker(document.body, { tabbable: true });

			// Find the next tabbable element after the currently focused element
			walker.currentNode = focusedElement;
			let nextElement = (e.shiftKey ? walker.previousNode() : walker.nextNode()) as HTMLElement;

			// If there is no next element, or it is outside the current scope, move focus to the
			// next element after the node to restore to instead.
			if ((!nextElement || !isElementInScope(nextElement, scope)) && nodeToRestore) {
				walker.currentNode = nodeToRestore;

				// Skip over elements within the scope, in case the scope immediately follows the node to restore.
				do {
					nextElement = (e.shiftKey ? walker.previousNode() : walker.nextNode()) as HTMLElement;
				} while (isElementInScope(nextElement, scope));

				e.preventDefault();
				e.stopPropagation();
				if (nextElement) {
					nextElement.focus();
				} else {
					// If there is no next element, blur the focused element to move focus to the body.
					focusedElement.blur();
				}
			}
		};

		if (!contain) {
			document.addEventListener("keydown", onKeyDown, true);
		}

		return () => {
			if (!contain) {
				document.removeEventListener("keydown", onKeyDown, true);
			}

			if (restoreFocus && nodeToRestore && isElementInScope(document.activeElement, scope)) {
				requestAnimationFrame(() => {
					if (document.body.contains(nodeToRestore)) {
						focusElement(nodeToRestore);
					}
				});
			}
		};
	}, [scopeRef, restoreFocus, contain]);
}

/**
 * Create a [TreeWalker]{@link https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker}
 * that matches all focusable/tabbable elements.
 *
 * @export
 * @param {HTMLElement} root
 * @param {IFocusManagerOptions} [opts]
 * @returns {TreeWalker}
 */
export function getFocusableTreeWalker(root: HTMLElement, opts?: IFocusManagerOptions): TreeWalker {
	const selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;
	const walker = document.createTreeWalker(
		root,
		NodeFilter.SHOW_ELEMENT,
		{
			acceptNode(node) {
				// Skip nodes inside the starting node.
				if (opts?.from?.contains(node)) {
					return NodeFilter.FILTER_REJECT;
				}

				if ((node as HTMLElement).matches(selector)) {
					return NodeFilter.FILTER_ACCEPT;
				}

				return NodeFilter.FILTER_SKIP;
			},
		},
		false,
	);

	if (opts?.from) {
		walker.currentNode = opts.from;
	}

	return walker;
}
