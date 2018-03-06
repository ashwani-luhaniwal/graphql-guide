/**
 * ---------------------
 * Configuring GraphiQL
 * ---------------------
 * Apollo Server allows you to easily use GraphiQL. Here’s how:
 * graphiql<Express/Connect/Hapi/Koa> accepts the following options object:
 */
const options = {
    // URL for the GraphQL POST endpoint this instance of GraphiQL serves
    endpointURL: String,

    // optional query to pre-populate the GraphiQL UI with
    query?: String,

    // optional operationName to pre-populate the GraphiQL UI with
    operationName?: String,

    // optional variables to pre-populate the GraphiQL UI with
    variables?: Object,

    // optional result to pre-populate the GraphiQL UI with
    result?: Object,

    // a string that will be added to the outgoing request header object (e.g "Authorization": 'Bearer')
    passHeader?: String,

    // optional CodeMirror theme to be applied to the GraphiQL UI
    editorTheme?: String,
}

/**
 * Apollo Server’s graphiql middleware does not run any query passed to it, it simply renders it in 
 * the UI.
 * To actually execute the query, the user must submit it via the GraphiQL UI, which will send the 
 * request to the GraphQL endpoint specified with endpointURL.
 */