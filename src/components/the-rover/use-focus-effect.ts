/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React from "react";
import { useSafeLayoutEffect } from "../../hooks/index";

/**
 * Invokes focus() on ref as a layout effect whenever focusesd
 * changes from false to true.
 *
 * @param {boolean | null} [focused]
 * @param {React.RefObject<T | any>} ref
 * @returns {void}
 */
export default function useFocus<T>(focused: boolean | null | undefined, ref: React.RefObject<T | any>): void {
	useSafeLayoutEffect(() => {
		if (focused && ref.current) {
			ref.current.focus();
		}
	}, [ref, focused]);
}
