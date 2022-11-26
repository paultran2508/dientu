import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'; // v15.0.0

const client = new ApolloClient({
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       productAttributes: {

    //         merge: (existing, incoming) => {
    //           console.log("🚀 ~ file: index.tsx ~ line 12 ~ incoming", incoming)
    //           console.log("🚀 ~ file: index.tsx ~ line 12 ~ existing", existing)
    //           return incoming
    //         }
    //       }
    //     }
    //   }

    // }
  }),
  //@ts-ignore
  link: createUploadLink({
    uri: "http://localhost:5000/graphql",
    credentials: 'include'
  }),
});

export default client;