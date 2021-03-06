/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { FunctionComponent, useState } from "react";
import Announcer from "../announcer";
import MessagesAnnouncerContext, {
	defaultMessagesAnnouncerContext,
	IMessagesAnnouncerContext,
} from "./context";

/**
 * The `MessagesAnnouncer` is a context-based announcer for the generic types of messages.
 * These can be notifications, alerts, form-related submissions, etc.
 *
 * @example <caption>Setup</caption>
 * // Setting up the announcer at the root-level
 * <MessagesAnnouncer>
 * 		<YourApp />
 * </MessagesAnnouncer>
 *
 * // Setting up the announcer hook at the top of a functional component:
 * const setMessage = useMessagesAnnouncer();
 *
 * // And sending a message
 * setMessage({ text: "Form was submitted", politeness: "polite"});
 * @param {FunctionComponent} props
 * @returns {JSX.Element}
 */
export const MessagesAnnouncer: FunctionComponent = ({ children }) => {
	const [politeness, setPoliteness] = useState(defaultMessagesAnnouncerContext.politeness);
	const [message, setMessage] = useState(defaultMessagesAnnouncerContext.message);

	/**
	 * Handles the message posting task.
	 *
	 * Politeness is optional, but affects the way the screen-reader ouputs a message
	 *
	 * @param {string} text
	 * @param {("assertive" | "polite")} [politeness]
	 */
	function onSetMessage(text: string, politeness?: "assertive" | "polite") {
		setMessage(text);
		politeness && setPoliteness(politeness);
	}

	const value: IMessagesAnnouncerContext = {
		message,
		politeness,
		setMessage: ({ text, politeness }) => onSetMessage(text, politeness),
	};

	return (
		<MessagesAnnouncerContext.Provider value={value}>
			<MessagesAnnouncerContext.Consumer>
				{({ message: text, politeness }) => (
					<Announcer ariaLive={politeness} id="notifications-announcer" text={text} />
				)}
			</MessagesAnnouncerContext.Consumer>
			{children}
		</MessagesAnnouncerContext.Provider>
	);
};
