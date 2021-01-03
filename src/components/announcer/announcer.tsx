import React, { FunctionComponent, memo } from "react";

export interface IAnnouncerProps {
	id?: string;
	ariaLive?: React.AriaAttributes["aria-live"];
	ariaAtomic?: React.AriaAttributes["aria-atomic"];
	styles?: React.CSSProperties;
	text?: string;
}

const styles: React.CSSProperties = {
	position: `absolute`,
	top: 0,
	width: 1,
	height: 1,
	padding: 0,
	overflow: `hidden`,
	clip: `rect(0, 0, 0, 0)`,
	whiteSpace: `nowrap`,
	border: 0,
};

export const Announcer: FunctionComponent<IAnnouncerProps> = ({ id, styles, ariaLive, ariaAtomic, text }) => {
	/**
	 *
	 *
	 * @returns
	 */
	function renderText() {
		if (!text || text.length === 0) {
			return null;
		}

		return text;
	}

	return (
		<div
			id={id}
			aria-live={ariaLive}
			aria-atomic={ariaAtomic}
			className="rat__route-announcer"
			data-testid="rat-route-announcer"
			style={styles}
		>
			{renderText()}
		</div>
	);
};

Announcer.defaultProps = {
	id: "rat-route-announcer",
	styles,
	ariaLive: "assertive",
	ariaAtomic: "true",
};

export default memo(Announcer);
