/* eslint-disable @typescript-eslint/no-empty-function */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */

import { useLayoutEffect } from "react";
import { isBrowser } from "../helpers/isBrowser";

export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : /* istanbul ignore next */ () => {};