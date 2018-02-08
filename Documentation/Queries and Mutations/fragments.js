/**
 * ---------------------
 * Fragments in GraphQL
 * ---------------------
 * Let's say we had a relatively complicated page in our app, which let us look at two heroes side 
 * by side, along with their friends. You can imagine that such a query could quickly get complicated, 
 * because we would need to repeat the fields at least twice - one for each side of the comparison.
 * 
 * That's why GraphQL includes reusable units called fragments. Fragments let you construct sets of 
 * fields, and then include them in queries where you need to. Here's an example of how you could 
 * solve the above situation using fragments:
 */
{
    leftComparison: hero(episode: EMPIRE) {
        ...comparisonFields
    }
    rightComparison: hero(episode: JEDI) {
        ...comparisonFields
    }
}

fragment comparisonFields on Character {
    name
    appearsIn
    friends {
        name
    }
}

// Output of above query is:

{
    "data": {
        "leftComparison": {
            "name": "Ashwani Luhaniwal",
            "appearsIn": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI"
            ],
            "friends": [
                {
                    "name": "Han Solo"
                },
                {
                    "name": "Leia Organa"
                },
                {
                    "name": "C-3PO"
                },
                {
                    "name": "R2-D2"
                }
            ]
        },
        "rightComparison": {
            "name": "R2-D2",
            "appearsIn": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI"
            ],
            "friends": [
                {
                    "name": "Luke Skywalker"
                },
                {
                    "name": "Hans Solo"
                },
                {
                    "name": "Leia Organa"
                }
            ]
        }
    }
}

/**
 * You can see how the above query would be pretty repetitive if the fields were repeated. The 
 * concept of fragments is frequently used to split complicated application data requirements into 
 * smaller chunks, especially when you need to combine lots of UI components with different fragments 
 * into one initial data fetch.
 */