/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { FunctionComponent } from "react";
import { SkipLink, ISkipLink, SKIP_LINK_DEFAULT_PROPS } from "./link";

export interface ISkipLinksProps {
	items?: ISkipLink[];
}

/**
 * Skip Links are links at the top of the page which jumps the user down to an anchor
 * or target at the beginning of the main content
 *
 * @param {ISkipLinksProps} props
 * @returns {JSX.Element}
 */
const SkipLinks: FunctionComponent<ISkipLinksProps> = ({ items }) => {
	function renderLinks() {
		const list =
			items && items.length > 0 ? (
				items.map((item) => <SkipLink key={item.target} target={item.target} text={item.text} />)
			) : (
				<SkipLink target={SKIP_LINK_DEFAULT_PROPS.target} text={SKIP_LINK_DEFAULT_PROPS.text} />
			);

		return <>{list}</>;
	}
	return (
		<div data-testid="skip-links" className="skip-links">
			{renderLinks()}
		</div>
	);
};

SkipLinks.defaultProps = {
	items: [
		{
			...SKIP_LINK_DEFAULT_PROPS,
		},
	],
};

export default SkipLinks;
