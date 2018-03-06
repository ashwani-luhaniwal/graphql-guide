/**
 * ------------------------------------
 * Build a GraphQL Server with Node.js
 * ------------------------------------
 * Apollo Server is a flexible, community driven, production-ready HTTP GraphQL middleware for 
 * Express, Hapi, Koa, and more.
 * 
 * Apollo Server is a library that helps you connect a GraphQL schema to an HTTP server in Node. 
 * If you want to get started quickly, take a look at the end-to-end example.
 * Apollo Server works with any GraphQL schema built with GraphQL.js, so you can build your schema 
 * with that directly or with a convenience library such as graphql-tools. You can use Apollo Server 
 * with all popular JavaScript HTTP servers, including Express, Connect, Hapi, Koa, Restify, and 
 * Lambda.
 * This server can be queried from any GraphQL client, since it supports all of the common 
 * semantics for sending GraphQL over HTTP, as documented on graphql.org. Apollo Server also 
 * supports some small extensions to the protocol, such as sending multiple GraphQL operations in 
 * one request.
 * 
 * ----------------------------
 * Selecting the right package
 * ----------------------------
 * Apollo Server is actually a family of npm packages, one for each Node.js HTTP server library.
 * 
 * Pick the one below that suits your needs:
 *      # Pick the one that matches your server framework
 *      npm install graphql apollo-server-express  # for Express or Connect
 *      npm install graphql apollo-server-hapi
 *      npm install graphql apollo-server-koa
 *      npm install graphql apollo-server-restify
 *      npm install graphql apollo-server-lambda
 *      npm install graphql apollo-server-micro
 *      npm install graphql apollo-server-azure-functions
 *      npm install graphql apollo-server-adonis
 * 
 * ---------
 * Features
 * ---------
 * At the end of the day, Apollo Server is a simple, production-ready solution without too many 
 * features. Here’s what you can do with it:
 *  - Attach a GraphQL schema to your HTTP server to serve requests
 *  - Attach GraphQL and GraphiQL via separate middlewares, on different routes
 *  - Accept queries via GET or POST
 *  - Support HTTP query batching
 *  - Support Apollo Tracing to get performance information about your server
 *  - Support Apollo Cache Control to inform caching gateways such as Apollo Engine
 * 
 */