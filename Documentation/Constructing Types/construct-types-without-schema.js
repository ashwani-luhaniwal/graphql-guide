/**
 * We can implement this same API without using GraphQL schema language:
 */
let express = require('express');
let graphqlHTTP = require('express-graphql');
let graphql = require('graphql');

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

// Define the User type
let userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
    }
});

// Define the Query type
let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: graphql.GraphQLString }
            },
            resolve: (_, {id}) => {
                return fakeDatabase[id];
            }
        }
    }
});

let schema = new graphql.GraphQLSchema({query: queryType});

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});

/**
 * When we use this method of creating the API, the root level resolvers are implemented on 
 * the Query and Mutation types rather than on a root object.
 * 
 * This is particularly useful if you want to create a GraphQL schema automatically from 
 * something else, like a database schema. You might have a common format for something like 
 * creating and updating database records. This is also useful for implementing features like 
 * union types which don't map cleanly to ES6 classes and schema language.
 */