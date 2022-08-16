import { Variable } from './../core/types/Variable';
import { Context } from './../types/Context';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createServer } from 'http';
import { Express } from 'express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core/dist/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import resolvers from '../resolvers'
import { DataSource } from 'typeorm';

export const Apollo = async (exp: Express, variable: Variable, dataSource: DataSource) => {
  const port = variable.port ?? 5000

  const httpServer = createServer(exp)
  const main = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,

    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    context: ({ req, res }: Context) => ({ req, res, dataSource })
  })
  await main.start()
  main.applyMiddleware({
    app: exp,
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true
    },


  })

  await new Promise<void>(resolve => httpServer.listen({ port }, resolve))

  console.log(`🚀 Server ready at http://localhost:${port + main.graphqlPath}`)
}
