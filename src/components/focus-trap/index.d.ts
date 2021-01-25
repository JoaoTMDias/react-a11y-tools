import { ReactNode, RefObject } from "react";

export interface IFocusTrapProps {
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
	items: RefObject<HTMLElement[]>;
	restoreFocus?: boolean;
	contain?: boolean;
}
