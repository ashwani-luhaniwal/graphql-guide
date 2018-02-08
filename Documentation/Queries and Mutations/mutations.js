/**
 * ---------------------
 * Mutations in GraphQL
 * ---------------------
 * Most discussions of GraphQL focus on data fetching, but any complete data platform needs a way 
 * to modify server-side data as well.
 * 
 * In REST, any request might end up causing some side-effects on the server, but by convention it's 
 * suggested that one doesn't use GET requests to modify data. GraphQL is similar - technically any 
 * query could be implemented to cause a data write. However, it's useful to establish a convention 
 * that any operations that cause writes should be sent explicitly via a mutation.
 * 
 * Just like in queries, if the mutation field returns an object type, you can ask for nested fields. 
 * This can be useful for fetching the new state of an object after an update. Let's look at a simple 
 * example mutation
 */
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
        stars
        commentary
    }
}

// Input query syntax is:
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
 * Note how createReview field returns the stars and commentary fields of the newly created review. 
 * This is especially useful when mutating existing data, for example, when incrementing a field, 
 * since we can mutate and query the new value of the field with one request.
 * 
 * You might also notice that, in this example, the review variable we passed in is not a scalar. 
 * It's an input object type, a special kind of object type that can be passed in as an argument. 
 * 
 * -----------------------------
 * Multiple fields in mutations
 * -----------------------------
 * A mutation can contain multiple fields, just like a query. There's one important distinction 
 * between queries and mutations, other than the name:
 * 
 * While query fields are executed in parallel, mutation fields run in series, one after the other.
 * 
 * This means that if we send two incrementCredits mutations in one request, the first is guaranteed 
 * to finish before the second begins, ensuring that we don't end up with a race condition with 
 * ourselves.
 */