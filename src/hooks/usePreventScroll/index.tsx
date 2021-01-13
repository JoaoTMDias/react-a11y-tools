/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
import { useLayoutEffect } from "react";
import { isMobileSafari } from "../../helpers/index";
import { preventScrollMobileSafari, preventScrollStandard } from "./preventScroll";

export interface IPreventScrollOptions {
	/** Whether the scroll lock is disabled. */
	isDisabled?: boolean;
}

/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 *
 * @export
 * @param {IPreventScrollOptions} [options={ isDisabled: undefined }]
 * @returns {void}
 */
/* istanbul ignore next */
export function usePreventScroll(options: IPreventScrollOptions = { isDisabled: undefined }): void {
	const { isDisabled } = options;

	// eslint-disable-next-line consistent-return
	useLayoutEffect(() => {
		if (!isDisabled) {
			return isMobileSafari
				/* istanbul ignore next */
				? preventScrollMobileSafari()
				: preventScrollStandard();
		}

		return undefined;
	}, [isDisabled]);
}
