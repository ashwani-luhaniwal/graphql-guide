/**
 * Apollo Server has a slightly different API depending on which server integration you are 
 * using, but all of the packages share the same core implementation and options format.
 */

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// the GraphQL schema in string form
const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
`;

// resolvers
const resolvers = {
    Query: { 
        books: () => {
            books
        } 
    },
};

// put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Initialize the app
const app = express();

/**
 * Apollo Server accepts a GraphQLOptions object as its single argument, like so (for Express):
 */
// the GraphQL endpoint
app.use('/graphql', 
            bodyParser.json(), 
            graphqlExpress({ 
                schema,
                // other options here
            }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});