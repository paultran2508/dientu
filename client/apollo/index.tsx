import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client' // v15.0.0

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:5000/graphql",
    credentials: 'include'
  }),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       productsByCategoryId: {
    //         keyArgs: false,
    //         merge(exiting: ProductMutationResponseFragment, incoming: ProductMutationResponseFragment, { }) {


    //         }
    //       }
    //     }
    //   }
    // }
  })
});

export default client;