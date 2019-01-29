import express from 'express';
import graphqlHTTP from 'express-graphql';

import Schema from './query';

const port = 5000;
const app = express();

// define the Schema
// const schema = new GraphQLSchema({ query: queryType });

// setup the nodejs GraphQL server
app.use('/api', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.listen(port);
console.log(`Server running at localhost:${port}`);