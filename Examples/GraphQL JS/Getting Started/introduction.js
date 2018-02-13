/**
 * ----------------------------
 * Introduction to GraphQL.js
 * ----------------------------
 * GraphQL is the rising star of backend technologies. It replaces REST as an API design paradigm 
 * and is becoming the new standard for exposing the functionality of a server. In this tutorial, 
 * you’ll learn how to build an idiomatic GraphQL server using the following technologies:
 * 
 * Server
 *  - graphql-yoga: Fully-featured GraphQL server with focus on easy setup, performance & great 
 *      developer experience. Built on top of Express, apollo-server, graphql-js and more.
 *  - Prisma: GraphQL abstraction layer that turns your database into a GraphQL API which provides 
 *      powerful, realtime CRUD operations for your data model.
 *  - Node.js: Runtime environment for building servers with JavaScript. GraphQL itself is 
 *      programming language agnostic, so check out the other tutorials in this section if you 
 *      prefer to use another language.
 *  - GraphQL Playground: Extremely useful tool for quickly testing GraphQL APIs. There’s no 
 *      need to build a whole frontend app just to test use cases, but it can also be a pain to 
 *      build and send GraphQL requests manually using Postman or other similar tools. Among other 
 *      things, GraphQL Playgrounds…
 *          … auto-generate a comprehensive, multi-column documentation for all your available 
 *              queries and mutations.
 *          … provide a text editor where you can write queries, mutations & subscriptions, with 
 *              syntax highlighting and autocompletion.
 *          … let you specify HTTP headers for your queries and mutations.
 * 
 * ---------------------------
 * What is a GraphQL server ?
 * ---------------------------
 * A GraphQL server should be able to:
 *  - Receive requests following the GraphQL format, for example:
 */
{ "query": "query { feed { url } }" }

/**
 *  - Connect to any necessary databases or services responsible for storing/fetching the 
 *      actual data.
 *  - Return a GraphQL response with the requested data, such as this:
 */
{ "data": { "feed": { "url": "http://graphql.org/" } } }

/**
 * Validate incoming requests against the schema definition and supported format. For example, 
 * if a query is made with an unknown field (e.g. eifgnsdf), the response should be something like:
 */
{
    "errors": [{
        "message": "Cannot query field \"eifgnsdf\" on type \"Link\"."
    }]
}