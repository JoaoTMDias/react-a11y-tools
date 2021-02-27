/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage: FunctionComponent = () => (
	<Layout>
		<SEO title="Homepage" />
		<h2 className="page__title">
			Build <span className="page__title__highlight">accessible experiences</span> for the web
		</h2>
		<p className="page__subheading">
			A small React component library that aims to ease the process of creating accessible
			design systems, web apps or websites.
		</p>
		<nav className="page__nav">
			<Link className="link link--primary" to="/docs/">
				Get Started
				<span className="link__icon">
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 448 512"
						fontSize="0.8em"
						role="presentation"
						focusable="false"
						height="1rem"
						width="1rem"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
					</svg>
				</span>
			</Link>{" "}
			<br />
			<a
				className="link"
				href="https://github.com/joaotmdias/react-a11y-tools"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="link__icon">
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						version="1.1"
						viewBox="0 0 32 32"
						role="presentation"
						focusable="false"
						height="1.5rem"
						width="1.5rem"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
					</svg>
				</span>
				Go to Github
			</a>
		</nav>
	</Layout>
)

export default IndexPage
