import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from "apollo-server-express";
const app = express();

/**
 * --------------------------
 * GraphQL end point options
 * ---------------------------
 * Options as a function
 * 
 * If you need to vary the options on a per-request basis, the options can also be passed as a 
 * function, in which case you get the req object or similar as an argument:
 */
app.use(
    '/graphql',
    bodyParser.json()
    graphqlExpress(req => {
        return {
            schema: myGraphQLSchema,
            context: {
                value: req.body.something,
            },
            // other options here
        };
    }),
);

/**
 * This is useful if you need to attach objects to your context on a per-request basis, for example 
 * to initialize user data, caching tools like dataloader, or set up some API keys.
 * 
 * ------------
 * Options API
 * ------------
 * The GraphQLOptions object has the following properties:
 * 
 * -------
 * schema
 * -------
 * The GraphQL.js schema object that represents your GraphQL schema. You can create this directly 
 * using GraphQL.js, the reference GraphQL implementation, or you can use graphql-tools, which 
 * makes it simple to combine a schema and resolvers.
 * 
 * --------
 * context
 * --------
 * The context is an object that’s accessible in every single resolver as the third argument. This 
 * is a great place to pass information that depends on the current request.
 */
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => {
        // Some sort of auth function
        const userForThisRequest = getUserFromRequest(req);

        return {
            schema: myGraphQLSchema,
            context: {
                user: userForThisRequest,
            },
            // other options here
        };
    }),
);

/**
 * ----------
 * rootValue
 * ----------
 * This is the value passed as the obj argument into the root resolvers. Read more about resolvers 
 * and their arguments in the graphql-tools docs. Note: This feature is not often used, since in 
 * most cases context is a better option to pass per-request data into resolvers.
 * 
 * ------------
 * formatError
 * ------------
 * A function to format errors before they are returned to the client. GraphQL does some processing 
 * on errors by default, and this is a great place to customize that. You can also access the 
 * original thrown error on the .originalError property:
 */
formatError: err => {
    if (err.originalError && err.originalError.error_message) {
        err.message = err.originalError.error_message;
    }

    return err;
};

/**
 * --------------
 * other options
 * --------------
 * The above are the only options you need most of the time. Here are some others that can be 
 * useful as workarounds for various situations:
 */

// options objects
const GraphQLOptions = {
    // a function applied to the parameters of every invocation of runQuery
    formatParams?: Function,

    // * - (optional) validationRules: extra validation rules applied to requests
    validationRules?: Array<ValidationRule>,

    // a function applied to each graphQL execution result
    formatResponse?: Function,

    // a custom default field resolver
    fieldResolver?: Function,

    // a boolean that will print additional debug logging if execution errors occur
    debug?: boolean
}