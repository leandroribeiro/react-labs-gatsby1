import * as React from "react"
import { HeadFC, Link, PageProps } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo";

const AboutPage: React.FC<PageProps> = () => {
    return (
        <Layout pageTitle="About Me">
            <p>Hi there! Im the proud creator of this site, which I built with Gatsby.</p>
        </Layout>
    )
}

export const Head: HeadFC = () => <Seo title="About" />

export default AboutPage