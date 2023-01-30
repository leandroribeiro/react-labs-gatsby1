import Layout from "../../components/layout";
import React from "react";
import Seo from "../../components/seo";
import { graphql, Link, PageProps } from "gatsby";

interface ParentPost {
    modifiedTime: string;
}
interface FrontMatter {
    date: string;
    title: string;
    slug: string;
}

interface Post {
    parent: ParentPost;
    frontmatter: FrontMatter;
    id: string;
    excerpt: string;

}

interface QueryResult {
    allMdx: {
        nodes: Post[];
    }
}

const BlogPage: React.FC<PageProps<QueryResult>> = ({ data }) => {
    return (
        <Layout pageTitle="My Blog Posts">
            <ul>
                {
                    data.allMdx.nodes.map((node) => (
                        <article key={node.id}>
                            <Link to={`/blog/${node.frontmatter.slug}`}>
                                {node.frontmatter.title}
                            </Link>
                        </article>
                    ))
                }
            </ul>
        </Layout>
    )
};

export const query = graphql`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          parent {
            ... on File {
                    modifiedTime(formatString: "MMMM D, YYYY")
            }
          },
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title,
            slug
          }
          id
          excerpt
        }
      }
    }`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage