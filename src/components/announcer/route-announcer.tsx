import React, { useState, useEffect, useCallback, FunctionComponent } from "react";
import * as H from "history";
import { usePrevious } from "../../hooks";
import Announcer from "./announcer";

export interface IRouteAnnouncerProps {
	id?: string;
	pathname?: H.History.Pathname;
	action?: {
		navigation: string;
		page: string;
	};
}

export interface HasHeadingResults {
	exists: boolean;
	content: string | null;
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
function hasDocumentTitle() {
	return !!document.title;
}

/**
 * Queries the DOM in order to find the first h1.
 *
 * @param {string} id
 * @returns {HasHeadingResults}
 */
function hasHeading(id = DEFAULT_WRAPPER_ID): HasHeadingResults {
	const firstHeading = document.querySelector(`#${id} h1`);

	const results = {
		exists: false,
		content: null,
	};

	if (firstHeading) {
		return {
			exists: true,
			content: firstHeading?.textContent,
		};
	}

	return results;
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
		const firstHeading = hasHeading(id);

		let pageName = `${action?.page} ${pathname}`;

		if (hasTitle) {
			pageName = document.title;
		}

		if (firstHeading.exists && firstHeading.content) {
			pageName = firstHeading.content;
		}

		const newAnnouncement = `${action?.navigation} ${pageName}`;

		if (text !== newAnnouncement) {
			setText(newAnnouncement);
		}
	}, [action, id, pathname, text]);

	useEffect(() => {
		if (previousPathname && previousPathname !== pathname) {
			setAnnouncerText();
		}
	}, [pathname, previousPathname, setAnnouncerText]);

	return (
		<div
			id="content-focus-wrapper"
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
