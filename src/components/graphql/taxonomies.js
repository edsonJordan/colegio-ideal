import React from "react"
import { graphql } from "gatsby"

const Taxonomies = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  query ($limit: Int = 100) {
    allWpStateSchool(limit: $limit) {
      nodes {
        databaseId
        name
      }
    }
  }
`

export default Taxonomies
