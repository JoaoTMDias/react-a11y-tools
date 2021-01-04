/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { FunctionComponent } from "react";

export interface ISkipLink {
	target: string;
	text: string;
}

export const SKIP_LINK_DEFAULT_PROPS = {
	target: "#content",
	text: "Skip to main content",
};

/**
 * Skip Link to Main Content
 *
 * @param {ISkipLink} props
 * @returns {JSX.Element}
 */
export const SkipLink: FunctionComponent<ISkipLink> = ({ target, text }) => (
	<a href={target} className="skip-links__item">
		{text}
	</a>
);

SkipLink.defaultProps = SKIP_LINK_DEFAULT_PROPS;

export default SkipLink;
