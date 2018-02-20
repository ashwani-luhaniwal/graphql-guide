/**
 * Every field on your Query and Mutation types will be backed by a resolver function which 
 * is responsible for fetching the corresponding data. The first resolver you’ll implement is 
 * the one for feed.
 * 
 * In terms of code organization, the resolvers for your queries, mutations and subscriptions 
 * will be written in dedicated files called Query.js and Mutation.js and Subscription.js. 
 * They’ll then be referenced in index.js to instantiate your GraphQLServer.
 */
async function feed(parent, args, context, info) {
    const { filter, first, skip } = args;    // destructive input arguments
    const where = filter
        ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
        : {};

    const allLinks = await context.db.query.links({});
    const count = allLinks.length;

    const queriedLinkes = await context.db.query.links({ first, skip, where });

    // Notice that in the line context.db.query.links({ first, skip, where }, info), you’re 
    // accessing the Prisma instance which you previously attached to the context object when 
    // instantiating the GraphQLServer.
    // return context.db.query.links({ first, skip, where }, info);
    return {
        linkIds: queriedLinkes.map(link => link.id),
        count
    }
}

module.exports = {
    feed,
}

/**
 * There are a couple of things to note about this implementation:
 *  - The name of the resolver function feed is identical to the name of the field on the 
 *      Query type. This is a requirement from graphql-js and graphql-tools which are used by 
 *      graphql-yoga.
 * 
 * The resolver receives four input arguments:
 *  - parent: Contains an initial value for the resolver chain (you don’t have to understand in 
 *      detail what it’s used for in this tutorial; if you’re curios though, you can check this article).
 *  - args: This object contains the input arguments for the query. These are defined in the 
 *      application schema. In your case that’s , first and skip for filtering and pagination.
 *  - context: The context is an object that can hold custom data that’s passed through the 
 *      resolver chain, i.e. every resolver can read from and write to it.
 *  - info: Contains the abstract syntax tree (AST) of the query and information about where the 
 *      execution in the resolver chain currently is.
 * 
 * The filter argument is used to build a filter object (called where) to retrieve link elements 
 * where the description or the url contains that filter string.
 * 
 * Finally, the resolver simply delegates the execution of the incoming query to the links 
 * resolver from the Prisma API and returns the result of that execution.
 */