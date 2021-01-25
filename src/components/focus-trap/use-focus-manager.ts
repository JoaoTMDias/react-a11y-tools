/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import { useContext } from "react";
import { FocusContext } from "./context";
import { IFocusManager } from "./index.d";

/**
 * Returns a FocusManager interface for the parent FocusTrap.
 * A FocusManager can be used to programmatically move focus within
 * a FocusTrap, e.g. in response to user events like keyboard navigation.
 *
 * @export
 * @returns {IFocusManager | null}
 */
export function useFocusManager(): IFocusManager | null {
	const ctx = useContext(FocusContext);

	return ctx;
}
