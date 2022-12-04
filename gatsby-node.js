
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\bmapbox-gl-csp-worker.js\b/i,
            use: { loader: 'worker-loader' },
          },
          {
            test: /mapbox-gl/,
            use: loaders.null(),
          }
        ],
      },
    })
  }
}

const path = require("path")


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
  {
    allWpColegio {
      nodes {
        databaseId
        title
        slug
        uri
        id
        customFieldColegio {
          activities
          approach
          description
          email
          facebook
          fieldGroupName
          instagram
          lenguages
          level
          direction
          phone
          whatsapp
          web
          proposal
          price
        }
        typeSchools {
          nodes {
            name
            databaseId
            slug
          }
        }
        stateSchools {
          nodes {
            name
            databaseId
            slug
          }
        }
        levelsSchools {
          nodes {
            name
            databaseId
            slug
          }
        }
      }
    }
  }  
  `)

  

  const queryResultsTaxonomies = await graphql(`
  {
    allWpStateSchool {
      nodes {
        name
        slug
        colegios {
          nodes {
            databaseId
            slug
            title 
            status
            customFieldColegio {
              activities
              approach
              description
              approach
              lenguages
              level
              email
              facebook
              price
              phone
              proposal
              whatsapp
              web
              type
            }
          }
        }
      }
    }
  }  
  `);

  const schoolTemplate = path.resolve(`src/templates/customPosts/schools.js`)
  queryResults.data.allWpColegio.nodes.forEach(node => {
    createPage({
      path: `${node.uri}`,
      component: schoolTemplate,
      context: {
        school: node,
      },
    })
  })
  
    // <FindSchoolGlobalContextProvider>
      
    // </FindSchoolGlobalContextProvider>
  const schoolTemplateTaxonomies = path.resolve(`src/templates/taxonomies/states.js`)
  queryResultsTaxonomies.data.allWpStateSchool.nodes.forEach(node => {
    createPage({
      path: `mejores-escuelas/${node.slug}`,
      component: schoolTemplateTaxonomies,
      context: {
        school: node,
      },
    })
  })

  
}
