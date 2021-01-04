/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { useState, FunctionComponent } from "react";
import Announcer from "../announcer";
import MessagesAnnouncerContext, { defaultMessagesAnnouncerContext, IMessagesAnnouncerContext } from "./context";

export interface IMessagesAnnouncerProps {
	id?: string;
}

/**
 * The `MessagesAnnouncer` is a wrapper for the app's content,
 * as well as the `Announcer` component.
 *
 * @param {FunctionComponent} props
 * @returns {JSX.Element}
 */
export const MessagesAnnouncer: FunctionComponent = ({ children }) => {
	const [politeness, setPoliteness] = useState(defaultMessagesAnnouncerContext.politeness);
	const [message, setMessage] = useState(defaultMessagesAnnouncerContext.message);

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

export default MessagesAnnouncer;
