/*
 * The copyright of this file belongs to Feedzai. The file cannot be
 * reproduced in whole or in part, stored in a retrieval system, transmitted
 * in any form, or by any means electronic, mechanical, or otherwise, without
 * the prior permission of the owner. Please refer to the terms of the license
 * agreement.
 *
 * (c) 2020 Feedzai, Rights Reserved.
 */

/**
 * hash.ts
 *
 * Implements a djb2 hashing function
 *
 * @author João Dias <joao.dias@feedzai.com>
 * @since ```feedzai.next.release```
 */

export const SEED = 5381;
const MULTIPLIER = 33;

/**
 * When we have separate strings it's useful to run a progressive
 * version of djb2 where we pretend that we're still looping over
 * the same string
 *
 * @param {number} h
 * @param {string} x
 * @returns {number}
 */
export function phash(h: number, x: string): number {
	let i = x.length;

	while (i) {
		// eslint-disable-next-line no-bitwise
		h = (h * MULTIPLIER) ^ x.charCodeAt(--i);
	}

	return h;
}

/**
 * DJB2 Hashing function
 *
 * @param {string} x
 * @returns {number}
 */
export function hash(x: string): number {
	return phash(SEED, x);
}
