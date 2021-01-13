/* istanbul ignore file */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
export function chain(...callbacks: any[]): (...args: any[]) => void {
	return (...args: any[]) => {
		for (const callback of callbacks) {
			if (typeof callback === "function") {
				callback(...args);
			}
		}
	};
}
