/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { useState, useEffect, useCallback, FunctionComponent } from "react";
import * as H from "history";
import { usePrevious } from "../../../hooks";
import Announcer from "../announcer";

export interface IRouteAnnouncerActions {
	navigation: string;
	page: string;
}
export interface IRouteAnnouncerProps {
	id?: string;
	pathname?: H.History.Pathname;
	action?: IRouteAnnouncerActions;
}

export interface HasHeadingResults {
	exists: boolean;
	content: string | undefined;
}

const DEFAULT_WRAPPER_ID = "content-focus-wrapper";

export const defaultProps: Partial<IRouteAnnouncerProps> = {
	id: DEFAULT_WRAPPER_ID,
	action: {
		navigation: "Navigated to",
		page: "new page at",
	},
};

/**
 * Queries the HTML Head to find the `title` tag
 *
 * @returns {boolean}
 */
export function hasDocumentTitle(): boolean {
	return !!document.title;
}

/**
 * Queries the DOM in order to find the first h1.
 *
 * @param {string} id
 * @returns {HasHeadingResults}
 */
export function hasHeading(id: string): HasHeadingResults {
	const firstHeading = document.querySelector(`#${id} h1`);

	return {
		exists: !!firstHeading,
		content: firstHeading?.textContent || undefined,
	};
}

/**
 * The `RouteAnnouncer` is a wrapper for the app's content,
 * as well as the `Announcer` component.
 *
 * It listens for a change in the `pathname` prop, so that it passes a new text
 * for the `Announcer` to read.
 *
 * @example <caption>Updating the location.</caption>
 * // Passing a new pathname as prop
 * <RouteAnnouncer pathname="/create-account"></RouteAnnouncer>
 *
 * // The screen reader outputs:
 * "Navigated to Create Account"
 *
 * @param {IRouteAnnouncerProps} props
 * @returns {JSX.Element}
 */
export const RouteAnnouncer: FunctionComponent<IRouteAnnouncerProps> = ({ id, pathname, action, children }) => {
	const [text, setText] = useState("");
	const previousPathname = usePrevious(pathname);

	/**
	 * Creates the string to be read by the `Announcer` component
	 * It depends on the existance of:
	 * 1. The location pathname.
	 * 2. A title in the document head.
	 * 3. The first h1 it finds on the DOM.
	 *
	 * Updates the state with whatever comes last.
	 *
	 * @returns {void}
	 */
	const setAnnouncerText = useCallback(() => {
		const hasTitle = hasDocumentTitle();
		const firstHeading = hasHeading(id ?? DEFAULT_WRAPPER_ID);

		let pageName = `${(action as IRouteAnnouncerActions).page} ${pathname}`;

		if (hasTitle) {
			pageName = document.title;
		}

		if (firstHeading.exists && firstHeading.content) {
			pageName = firstHeading.content;
		}

		const newAnnouncement = `${(action as IRouteAnnouncerActions).navigation} ${pageName}`;

		setText(newAnnouncement);
	}, [action, id, pathname]);

	useEffect(() => {
		if (previousPathname && previousPathname !== pathname) {
			setAnnouncerText();
		}
	}, [pathname, previousPathname, setAnnouncerText]);

	return (
		<div
			id={id}
			style={{
				outline: "none",
			}}
			tabIndex={-1}
		>
			{children}
			<Announcer text={text} />
		</div>
	);
};

RouteAnnouncer.defaultProps = defaultProps;

export default RouteAnnouncer;
