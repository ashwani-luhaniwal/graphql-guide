/**
 * ------------------------------
 * Input Types in GraphQL Schema
 * ------------------------------
 * So far, we've only talked about passing scalar values, like enums or strings, as arguments 
 * into a field. But you can also easily pass complex objects. This is particularly valuable in 
 * the case of mutations, where you might want to pass in a whole object to be created. In the 
 * GraphQL schema language, input types look exactly the same as regular object types, but with 
 * the keyword 'input' instead of 'type':
 */
input ReviewInput {
    stars: Int!
    commentary: String
}

// Here is how you could use the input object type in a mutation:
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
        stars
        commentary
    }
}

// Input of query syntax is:
{
    "ep": "JEDI",
    "review": {
        "stars": 5,
        "commentary": "This is a great movie!"
    }
}

// Output of above query is:
{
    "data": {
        "createReview": {
            "stars": 5,
            "commentary": "This is a great movie!"
        }
    }
}

/**
 * The fields on an input object type can themselves refer to input object types, but you can't 
 * mix input and output types in your schema. Input object types also can't have arguments on 
 * their fields.
 */