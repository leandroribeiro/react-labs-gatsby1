import * as React from "react"
import {HeadFC, Link, PageProps} from "gatsby"
import Layout from "../components/layout"
import {StaticImage} from "gatsby-plugin-image";
import Seo from "../components/seo";

const IndexPage: React.FC<PageProps> = () => {
    return (
        <Layout pageTitle="Home Page">
            <p>I'm making this by following the Gatsby Tutorial.</p>
            <StaticImage
                src="../images/meme_yoda.jpg"
                alt="Master Yoda"/>
        </Layout>
    )
}

export const Head: HeadFC = () => <Seo title="Home Page" />

export default IndexPage