/**
 * Subscription resolvers are implemented slightly differently than those for queries and 
 * mutations. Rather than directly writing the resolver function function, you define an 
 * object with a subscribe property. The value of this property is the actual subscription 
 * resolver.
 * 
 * Just like with queries and mutations though, and thanks to the prisma-binding package, 
 * all you need to do to actually implement the resolver functions is delegate the 
 * subscription execution to the Prisma instance you create in index.js.
 * 
 * Talking about index.js, the last thing you need to do to make subscriptions work is 
 * adding the resolvers to the resolvers object which gets passed to the constructor of 
 * your GraphQLServer.
 */

const newLink = {
    subscribe: (parent, args, ctx, info) => {
        return ctx.db.subscription.link(
            { },
            info,
        )
    },
};

const newVote = {
    subscribe: (parent, args, ctx, info) => {
        return ctx.db.subscription.vote(
            { },
            info,
        )
    },
};

module.exports = {
    newLink,
    newVote,
};