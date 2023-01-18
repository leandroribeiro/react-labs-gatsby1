import Layout from "../components/layout";
import React from "react";
import Seo from "../components/seo";
import {graphql, PageProps} from "gatsby";

interface FrontMatter {
    date: string;
    title: string;
}
interface Post {
    frontmatter: FrontMatter;
    id: string;
    excerpt: string;

}

interface QueryResult {
    allMdx: {
        nodes: Post[];
    }
}

const BlogPage: React.FC<PageProps<QueryResult>> = ({data}) => {
    return (
        <Layout pageTitle="My Blog Posts">
            <ul>
                {
                    data.allMdx.nodes.map((node) => (
                        <article key={node.id}>
                            <h2>{node.frontmatter.title}</h2>
                            <p>Posted: {node.frontmatter.date}</p>
                            <p>{node.excerpt}</p>
                        </article>
                    ))
                }
            </ul>
        </Layout>
    )
};

export const query = graphql`
    query MyQuery {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
          id
          excerpt
        }
      }
    }`;

export const Head = () => <Seo title="My Blog Posts"/>;

export default BlogPage