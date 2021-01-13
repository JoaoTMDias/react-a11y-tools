/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */

import { hash } from "../hash";

const UUID = [
	"3dc15e37-2475-4887-93a6-bf130bf9e843",
	"5aa6e24c-cf5b-4fb1-a98a-026f2ee1f60a",
	"4e528190-3116-4aa5-a3ab-793f92c23f73",
	"f16692ca-82f7-4449-8cff-b55eb073f127",
	"7e863c52-e7b6-441e-96a8-a43ac7e5c792",
	"a7fc155c-bdbe-4037-a210-68d1529b251b",
	"77fe7bd5-68f5-4765-865c-c1b4cfce53d6",
	"e14e0a35-8bdd-4a1f-b1c8-946ef0d17752",
	"0d9efdc8-0794-4c30-967b-597283f9d20d",
	"3800ff3e-5499-4186-b2f4-2a9cf2d8d593",
	"281d012a-df6b-4c4a-bb86-a0c95d6e2e66",
	"f55c1389-6652-4b87-a1f5-c09d7decea50",
	"2c18b7c6-0226-401a-b76e-efe9827f73fa",
	"5c37b1f4-945e-4083-913d-5296d209fc19",
	"041d6677-e339-4263-95b7-7692ff8f6873",
	"6043adf4-bef2-425e-9191-7e5d2e237b71",
	"5b8eb445-91b7-412f-b741-6cbf49bf4cb1",
	"10a131e7-8a2c-4ab5-8cc5-fe6ba6da101f",
	"cd993071-c8a0-4bda-96e0-ddbe01e6d594",
	"0d26e634-9da0-49d3-8839-0991e216e1b4",
	"7fa2d14e-a916-4990-85f0-f17aaf3850ea",
	"fe1f0a00-4ffa-41fe-9d86-1207dd3cb805",
	"4d48f328-27d3-4837-b352-c66bfd1c99f6",
	"e883045d-8d28-4d69-8845-24d78d366c14",
	"6891428a-aec0-4c3e-ba00-ba0fc6855428",
	"a62104dc-ae9f-49ba-9736-39708a8676d6",
	"c84e5649-e5ed-44c4-8061-1bfa37aac2d7",
	"1a8a728d-7df2-4a7b-8318-a1d7072791e9",
	"36886c4c-6f88-4ef6-a185-020a43ab860d",
	"483de2d3-29bc-4272-b31b-d4934b770656",
];

const HASHED_UUIDS = UUID.map((id) => hash(id));

describe("src/helpers/hash", function () {
	it("should return the same expected hash value", function () {
		const value = UUID[0];
		const expectedHash = HASHED_UUIDS[0];

		expect(hash(value)).toEqual(expectedHash);
	});

	it("should return the same hash how many times the same content is passed", function () {
		const value = UUID[1];
		const expectedHash = HASHED_UUIDS[1];
		const runovers = UUID.length;

		for (let index = 0; index < runovers; index++) {
			expect(hash(value)).toEqual(expectedHash);
		}
	});

	it("should return a hash for an array of UUIDs", function () {
		UUID.forEach((id, index) => {
			expect(hash(id)).toEqual(HASHED_UUIDS[index]);
		});
	});

	it("should return different hashes for each item of an array", function () {
		const uniqueHashes = HASHED_UUIDS;

		expect(uniqueHashes).toHaveLength(HASHED_UUIDS.length);
	});
});
