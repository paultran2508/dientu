import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: 'include'
})


const client = new ApolloClient({
  link,
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