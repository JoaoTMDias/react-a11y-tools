/* istanbul ignore file */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */
export const isMobileSafari =
	typeof window !== "undefined" && window.navigator != null
		? /AppleWebKit/.test(window.navigator.userAgent) &&
		(/^(iPhone|iPad)$/.test(window.navigator.platform) ||
			// iPadOS 13 lies and says its a Mac, but we can distinguish by detecting touch support.
			(window.navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
		: false;
