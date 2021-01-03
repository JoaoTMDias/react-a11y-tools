import React, { FunctionComponent } from "react";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Router, Link, RouteComponentProps, useLocation } from "@reach/router";
import RouteAnnouncer, { defaultProps } from "../route-announcer";
import { IRouteAnnouncerProps } from "../route-announcer";
import { renderWithRouter } from "../../../helpers/index";

const Home: FunctionComponent<RouteComponentProps> = () => {
	return (
		<div>
			<h1>Home</h1>
			<p>You are on the initial page</p>
		</div>
	);
};

const About: FunctionComponent<RouteComponentProps> = () => {
	return (
		<div>
			<h1>About</h1>
			<p>You are on the about page</p>
		</div>
	);
};

const Contacts: FunctionComponent<RouteComponentProps> = () => {
	return (
		<div>
			<p>You are on the contacts page</p>
		</div>
	);
};
const NoMatch: FunctionComponent<RouteComponentProps> = () => {
	return (
		<div>
			<h1>Not Found</h1>
			<p>404: No Match</p>
		</div>
	);
};

const App = (): JSX.Element => {
	const location = useLocation();
	return (
		<RouteAnnouncer pathname={location.pathname}>
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/contacts">Contacts</Link>
			<Router>
				<Home path="/" />
				<About path="/about" />
				<Contacts path="/contacts" />
				<NoMatch default />
			</Router>
		</RouteAnnouncer>
	);
};

describe("src/announcer/__tests__/route-announcer", () => {
	let props: IRouteAnnouncerProps;

	beforeEach(() => {
		props = {
			...defaultProps,
			pathname: "/",
		};
	});

	it("should render without errors", () => {
		const component = render(<RouteAnnouncer {...props} />);

		expect(component).toMatchSnapshot();
	});

	it("should update the announcer when the location changes", async () => {
		// 0. Render the app with the `router`
		const {
			history: { navigate },
		} = renderWithRouter(<App />);

		// 1. Expect the heading and paragraph to exist
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home");
		expect(screen.getByText("You are on the initial page")).toBeVisible();

		// 2. Transition to another page
		await navigate("/about");

		// 3. Expect the new heading and paragraphs to exist
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("About");
		expect(screen.getByText("You are on the about page")).toBeVisible();

		// 4. The Announcer should have new text
		await waitFor(() => {
			expect(screen.getByText("Navigated to About")).toBeInTheDocument();
		});
	});
});
