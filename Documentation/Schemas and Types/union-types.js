/**
 * ------------------------------
 * Union Types in GraphQL Schema
 * ------------------------------
 * Union types are very similar to interfaces, but they don't get to specify any common fields 
 * between the types.
 */
union SearchResult = Human | Droid | Starship

/**
 * Wherever we return a SearchResult type in our schema, we might get a Human, a Droid, or a 
 * Starship. Note that members of a union type need to be concrete object types; you can't 
 * create a union type out of interfaces or other unions.
 * 
 * In this case, if you query a field that returns the SearchResult union type, you need to use 
 * a conditional fragment to be able to query any fields at all:
 */
{
    search(text: "an") {
        ... on Human {
            name
            height
        }
        ... on Droid {
            name
            primaryFunction
        }
        ... on Starship {
            name
            length
        }
    }
}

// Output of above query is:
{
    "data": {
        "search": [
            {
                "name": "Han Solo",
                "height": 1.8
            },
            {
                "name": "Leia Organa",
                "height": 1.5
            },
            {
                "name": "TIE Advanced x1",
                "length": 9.2
            }
        ]
    }
}