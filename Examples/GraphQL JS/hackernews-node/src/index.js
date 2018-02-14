const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
  Query,
  Mutation,
}

/**
 * Here you instantiate your GraphQLServer with the following arguments:
 *  - typeDefs: These are the type definitions from your application schema imported from 
 *      src/schema.graphql.
 *  - resolvers: This is a JavaScript object that mirrors the Query, Mutation and Subscription 
 *      types and their fields from your application schema. Each field in the application schema 
 *      is represented by a function with the same name in that object.
 *  - context: This is an object that get’s passed through the resolver chain and every resolvers 
 *      can read from or write to.
 * 
 * Notice that the context object has the db field which contains an instance of Prisma from the 
 * prisma-binding package. This instance will allow your resolvers to simply delegate the 
 * execution of an incoming request to an appropriate resolver from the Prisma API.
 * 
 * When instantiating Prisma, you need to provide information about your Prisma database service:
 *  - typeDefs: The type definition from your Prisma schema
 *  - endpoint: The HTTP endpoint of your Prisma database service
 *  - secret: The secret which allows to access the Prisma database service (this is defined in 
 *      prisma.yml)
 * 
 * Because you provide this information, the Prisma instance will get full access to your 
 * database service and can be used to resolve incoming request later on.
 */
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: '__PRISMA_ENDPOINT__', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
