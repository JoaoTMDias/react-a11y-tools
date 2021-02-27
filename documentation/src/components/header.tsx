/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }: { siteTitle: string }): JSX.Element => (
	<header className="header">
		<div className="header__container">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="65"
				height="65"
				className="header__logo"
				fill="none"
				role="presentation"
				focusable="false"
				viewBox="0 0 65 65"
			>
				<path
					fill="url(#paint0_linear)"
					d="M52.07 23.012c-2.548.74-12.56.09-14.051 4.09-2.61 6.997 2.04 20.316 3.94 26.964.983 3.43-4.471 4.663-4.991 1.092-1.005-6.912-3.343-11.683-4.187-12.608-.372-.409-.72-.409-1.086.009-.842.953-3.18 5.708-4.182 12.6-.52 3.57-5.972 2.337-4.992-1.093 1.903-6.648 6.55-19.967 3.942-26.964-1.49-4-11.504-3.35-14.05-4.09-2.694-.782-1.72-4.873 1.342-4.03 5.554 1.526 18.486 1.509 18.486 1.509s12.931.017 18.485-1.51c3.063-.842 4.038 3.25 1.344 4.031zM32.24 8.342a5.264 5.264 0 015.265 5.264 5.264 5.264 0 11-10.53 0 5.264 5.264 0 015.266-5.264zm0-7.517C14.569.825.242 15.15.242 32.825c0 17.673 14.327 32 32 32 17.674 0 32-14.327 32-32 0-17.674-14.326-32-32-32"
				></path>
				<path
					stroke="#fff"
					strokeMiterlimit="10"
					strokeWidth="0.265"
					d="M62.322 32.824c0-16.612-13.468-30.079-30.081-30.079-16.612 0-30.081 13.467-30.081 30.079 0 16.614 13.469 30.08 30.08 30.08 16.614 0 30.081-13.467 30.081-30.08v0z"
				></path>
				<defs>
					<linearGradient
						id="paint0_linear"
						x1="15"
						x2="57"
						y1="8"
						y2="53"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0.005" stopColor="#BC027F"></stop>
						<stop offset="1" stopColor="#8002BC"></stop>
					</linearGradient>
				</defs>
			</svg>
			<h1 className="header__title">
				React <abbr title="Accessibility">A11y</abbr> Tools
			</h1>
		</div>
	</header>
)

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
