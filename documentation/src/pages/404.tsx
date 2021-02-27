/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me
 */
import React, { FunctionComponent } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage: FunctionComponent = () => (
	<Layout>
		<SEO title="404: Not found" />
		<h1>404: Not Found</h1>
		<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
	</Layout>
)

export default NotFoundPage
