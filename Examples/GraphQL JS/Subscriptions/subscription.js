/**
 * -------------
 * Subscription
 * -------------
 * In this section, you’ll learn how you can bring realtime functionality into your app by 
 * implementing GraphQL subscriptions. Recalling our initial requiements, the goal is to 
 * implement two subscriptions:
 *  - Send realtime updates to subscribed clients when a new link element is created
 *  - Send realtime updates to subscribed clients when an existing link element is upvoted
 * 
 * ----------------------------------
 * What are GraphQL subscriptions ?
 * ----------------------------------
 * Subscriptions are a GraphQL feature that allows the server to send data to the clients when 
 * a specific event happens. Subscriptions are usually implemented with WebSockets, where the 
 * server holds a steady connection to the client. This means you’re not using the 
 * Request-Response-Cycle that we used for all previous interactions with the API any more. 
 * Instead, the client initially opens up a steady connection to the server by specifying which 
 * event it is interested in. Every time this particular event happens, the server uses the 
 * connection to push the data that’s related to the event to the client.
 * 
 * -------------------------
 * Subscription with Prisma
 * -------------------------
 * Luckily for us, Prisma comes with out-of-the-box support for subscriptions. In fact, if you 
 * take a look at the Prisma schema in src/generated/prisma.graphql, you’ll notice that the 
 * Subscription type is already there and looks as follows:
 */
type Subscription {
    vote(where: VoteSubscriptionWhereInput): VoteSubscriptionPayload
    link(where: LinkSubscriptionWhereInput): LinkSubscriptionPayload
    user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

/**
 * These subscriptions can fire for the following events:
 *  - A new node is created
 *  - An existing node updated
 *  - An existing node is deleted
 * 
 * Notice that you can constrain for which events exactly should fire. For example, if you only 
 * want to subscribe to update to one specific Link or when a specific User is deleted, you can 
 * do so as well by providing the where argument to the subscription.
 * 
 * GraphQL subscriptions follow the same syntax as queries and mutations, so you could for 
 * example subscribe to events of existing Link elements being updated with the following 
 * subscription:
 */
subscription {
    link(where: {
        mutation_in: [UPDATED]
    }) {
        node {
            id
            url
            description 
        }
    }
}

/**
 * This subscription would fire everytime an existing Link is updated and the server would 
 * send along the (potentially updated) url and description values for the updated Link.
 * 
 * -----------------------------------
 * Implementing GraphQL subscriptions
 * -----------------------------------
 * To implement subscriptions for your GraphQL API, you follow the same process of adding 
 * queries and mutations. First add them to your application schema, then implement the 
 * corresponding resolvers.
 */