/**
 * -------------------------------------------
 * Query and Mutation Types in GraphQL Schema
 * -------------------------------------------
 * Most types in your schema will just be normal object types, but there are two types that are 
 * special within a schema:
 */
schema {
    query: Query
    mutation: Mutation
}

/**
 * Every GraphQL service has a query type and may or may not have a mutation type. These types are 
 * the same as a regular object type, but they are special because they define the entry point of 
 * every GraphQL query. So if you see a query that looks like:
 */
query {
    hero {
        name
    }
    droid(id: "2000") {
        name
    }
}

// Output of above query is:
{
    "data": {
        "hero": {
            "name": "R2-D2"
        },
        "droid": {
            "name": "C-3PO"
        }
    }
}

/**
 * That means that the GraphQL service needs to have a Query type with hero and droid fields:
 */
type Query {
    hero(episode: Episode): Character
    droid(id: ID!): Droid
}

/**
 * Mutations work in a similar way - you define fields on the Mutation type, and those are available 
 * as the root mutation fields you can call in your query.
 * 
 * It's important to remember that other than the special status of being the "entry point" into 
 * the schema, the Query and Mutation types are the same as any other GraphQL object type, and their 
 * fields work exactly the same way.
 */