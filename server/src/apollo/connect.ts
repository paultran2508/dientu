import { Variable } from './../core/types/Variable';
import { Context } from './../types/Context';
import { UserResolver } from './../resolvers/UserResolver';
import { Hello } from './../resolvers/Hello';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createServer } from 'http';
import { Express } from 'express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core/dist/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

export const Apollo = async (exp: Express, variable: Variable) => {
  const port = variable.port ?? 5000

  const httpServer = createServer(exp)
  const main = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello, UserResolver],
      validate: false,

    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    context: ({ req, res }: Context) => ({ req, res })
  })
  await main.start()
  main.applyMiddleware({
    app: exp,
    cors: false
  })

  await new Promise<void>(resolve => httpServer.listen({ port }, resolve))

  console.log(`🚀 Server ready at http://localhost:${port + main.graphqlPath}`)
}
