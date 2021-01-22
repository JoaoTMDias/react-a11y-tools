/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { ReactElement, useReducer, useMemo, useEffect } from "react";
import { RoverProviderProps, RovingContext } from "../index.d";
import { initialState, RoverContext } from "./context";
import { reducer } from "./reducer";

const Provider = ({ children, direction = "vertical" }: RoverProviderProps): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = useMemo<RovingContext>(
		() => ({
			state,
			dispatch,
		}),
		[state],
	);

	useEffect(() => {
		dispatch({
			type: "CHANGE_DIRECTION",
			payload: { direction },
		});
	}, [direction, dispatch]);

	return <RoverContext.Provider value={context}>{children}</RoverContext.Provider>;
};

export default Provider;
