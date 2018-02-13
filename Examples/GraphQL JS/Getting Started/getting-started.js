/**
 * -------------------------------------
 * Define the application's GraphQL API
 * -------------------------------------
 * You’ll start by defining the GraphQL schema for your application. We’ll also refer to this as 
 * your application schema. Schemas are written in the GraphQL Schema Definition Language (SDL).
 * 
 * -----------------
 * API Requirements
 * -----------------
 * Here you’re going to build the backend for a Hackernews clone, so let’s think about the 
 * requirements your API should provide:
 *  - Retrieve a list (feed) of link elements
 *  - Allow users to signup up with their name, email and password
 *  - Users who signed up should be able to login again with their email and password
 *  - Allow authenticated users to post new link elements
 *  - Allow authenticated users to upvote an existing link element
 *  - Send realtime updates to subscribed clients when a new link element is created
 *  - Send realtime updates to subscribed clients when an existing link element is upvoted
 * 
 * --------------------------------
 * Defining the application schema
 * --------------------------------
 * It’s now the responsility of the application schema to define an API that allows for client 
 * applications to perform the operations defined above. So, you need to translate the requirements 
 * into corresponding GraphQL queries, mutations and subscriptions.
 * 
 * As you learned in the Core Concepts chapter, you can do so by writing the Query, Mutation 
 * and Subscription types (which are also called root types) in your schema.
 * 
 * Here is an application schema that caters the requirements defined above. For now, we don’t 
 * care where the User, Link and Vote types are coming from and how exactly they’re defined.
 */
type Query {
    # Retrieve a list ("feed") of link elements 
    feed(filter: String, skip: Int, first: Int): [Link!]!
}

type Mutation {
    # Allow users to signup their name, email and password
    signup(name: String!, email: String!, password: String!): AuthPayload!

    # Users who signed up should be able to login again with their email and password
    login(email: String!, password: String!): AuthPayload!

    # Allow authenticated users to post new link elements
    postMessage(url: String!, description: String!): Link

    # Allow authenticated users to upvote an existing link element 
    vote(linkId: ID!): Vote
}

type Subscription {
    # Send realtime updates to subscribed clients when a new link element is created 
    newLink: LinkSubscriptionPayload

    # Send realtime updates to subscribed clients when an existing link element is upvoted
    newVote: VoteSubscriptionPayload
}

type AuthPayload {
    token: String
    user: User
}

/**
 * Great! So this is the final application schema you want to have implemented in the end. 
 * Notice that the feed query allows to send filter and pagination (skip and first) arguments 
 * to constrain the list of link elements to be returned by the server.
 * 
 * In the following, you’ll gradually implement the defined queries, mutations and subscriptions 
 * one by one. The implementation process will look somewhat similar every time - this is 
 * also referred to as schema-driven development:
 *  1. Adjust the data model of your Prisma database service
 *  2. Deploy the Prisma database service to apply your changes
 *  3. Extend your application schema with a new root field
 *  4. Implement the resolver for the root field by delegating the execution to the corresponding 
 *      Prisma resolver
 * 
 * ------------------------------
 * Bootstrap your GraphQL server
 * ------------------------------
 * It’s time to start creating your GraphQL server. You could do so by starting from scratch, 
 * use "npm init -y" to setup your package.json and manually add the required dependencies (such 
 * as graphql-yoga). However, in this tutorial you’ll use "graphql create", a feature of the 
 * graphql-cli which will bootstrap your GraphQL server and give you a head start (think of it 
 * like create-react-app but for GraphQL servers instead of React applications).
 * 
 * The first step for you is to install the graphql-cli so you can make use of the 
 * "graphql create" command.
 * 
 * With the CLI installed, you can now use the graphql create command to setup your GraphQL 
 * server. Note that this command is based on several GraphQL boilerplate projects that provide 
 * an initial set of features for various languages and technologies.
 */