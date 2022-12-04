import React from "react"
import { graphql } from "gatsby"

const Logo = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  query {
    allSite {
      edges {
        node {
          siteMetadata {
            title
            siteUrl
            description
            author
          }
        }
      }
    }
  }
`

export default Logo