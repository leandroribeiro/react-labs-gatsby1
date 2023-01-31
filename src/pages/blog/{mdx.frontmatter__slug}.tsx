import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import {graphql, PageProps} from "gatsby";
import {GatsbyImage, getImage, IGatsbyImageData, ImageDataLike} from "gatsby-plugin-image";

interface ParentPost{
    modifiedTime: string;
}
interface FrontMatter {
    date: string;
    title: string;
    hero_image: IGatsbyImageData;
    hero_image_alt: string;
    hero_image_credit_link: string;
    hero_image_credit_text: string;
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
    let image = getImage(data.mdx.frontmatter.hero_image) as IGatsbyImageData;
    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <p>Posted: {data.mdx.frontmatter.date}</p>
            <GatsbyImage alt={data.mdx.frontmatter.hero_image_alt} image={image} />
            <p>
                Photo Credit: {" "}
                <a href={data.mdx.frontmatter.hero_image_credit_link}>
                    {data.mdx.frontmatter.hero_image_credit_text}
                </a>
            </p>
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
          title,
          hero_image_alt
          hero_image_credit_link
          hero_image_credit_text
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }          
        }
        id
        excerpt
      }
  }`

export const Head : React.FC<PageProps<QueryResult>> = ({data}) => <Seo title={data.mdx.frontmatter.title}/>

export default BlogPost