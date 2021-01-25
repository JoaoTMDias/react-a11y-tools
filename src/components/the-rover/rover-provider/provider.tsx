/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { ReactElement, useReducer, useEffect } from "react";
import { IRoverProviderProps } from "../index.d";
import { initialState, RoverContext } from "./context";
import { reducer } from "./reducer";

const Provider = ({ children, direction = "vertical" }: IRoverProviderProps): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: "CHANGE_DIRECTION",
			payload: { direction },
		});
	}, [direction, dispatch]);

	const value = {
		state,
		dispatch,
	};

	return <RoverContext.Provider value={value}>{children}</RoverContext.Provider>;
};

export default Provider;
