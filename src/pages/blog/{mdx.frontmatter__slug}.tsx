import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import {graphql, PageProps} from "gatsby";

interface ParentPost{
    modifiedTime: string;
}
interface FrontMatter {
    date: string;
    title: string;
}

interface Post {
    parent: ParentPost;
    frontmatter: FrontMatter;
    id: string;
    excerpt: string;

}

interface QueryResult {
    mdx: Post;
}

const BlogPost : React.FC<PageProps<QueryResult>> = ({ data, children }) => {
    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <p>{data.mdx.frontmatter.date}</p>
            {children}
        </Layout>
    )
}

export const query = graphql`
  query ($id: String) {
      mdx(id: {eq: $id}) {
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        excerpt
      }
  }`

export const Head : React.FC<PageProps<QueryResult>> = ({data}) => <Seo title={data.mdx.frontmatter.title}/>

export default BlogPost