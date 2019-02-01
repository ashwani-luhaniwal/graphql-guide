import express from 'express';
import graphqlHTTP from 'express-graphql';
import GraphQLSchema from 'graphql';

import Schema from './query';

const port = 5000;
const app = express();

// const Schema = new GraphQLSchema({ query: queryType });

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.listen(port);
console.log(`GraphQL server running at localhost:${port}`);