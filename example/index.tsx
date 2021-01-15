import * as React from "react";
import "react-app-polyfill/ie11";
import * as ReactDOM from "react-dom";
import { Demo } from "./components/demo";

const App = () => {
	return (
		<div>
			<Demo />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
