/**
 * ------------------------------
 * Constructing Types in GraphQL
 * ------------------------------
 * For many apps, you can define a fixed schema when the application starts, and define it 
 * using GraphQL schema language. In some cases, it's useful to construct a schema 
 * programmatically. You can do this using the GraphQLSchema constructor.
 * 
 * When you are using the GraphQLSchema constructor to create a schema, instead of defining 
 * Query and Mutation types solely using schema language, you create them as separate object types.
 * 
 * For example, let's say we are building a simple API that lets you fetch user data for a few 
 * hardcoded users based on an id. Using buildSchema we could write a server with:
 */
let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type User {
        id: String
        name: String
    }

    type Query {
        user(id: String): User
    }
`);

// Maps id to User object
let fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice',
    },
    'b': {
        id: 'b',
        name: 'bob',
    },
};

let root = {
    user: ({id}) => {
        return fakeDatabase[id];
    }
};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});