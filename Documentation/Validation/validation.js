/**
 * ----------------------
 * Validation in GraphQL
 * ----------------------
 * By using the type system, it can be predetermined whether a GraphQL query is valid or not. 
 * This allows servers and clients to effectively inform developers when an invalid query has 
 * been created, without having to rely on runtime checks.
 * 
 * To start, let's take a complex valid query. This is a nested query, similar to an example from 
 * the previous section, but with the duplicated fields factored out into a fragment:
 */
{
    hero {
        ...NameAndAppearances
        friends {
            ...NameAndAppearances
            friends {
                ...NameAndAppearances
            }
        }
    }
}

fragment NameAndAppearances on Character {
    name
    appearsIn
}

// Output of above query is:
{
    "data": {
        "hero": {
            "name": "R2-D2",
            "appearsIn": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI"
            ],
            "friends": [
                {
                    "name": "Luke Skywalker",
                    "appearsIn": [
                        "NEWHOPE",
                        "EMPIRE",
                        "JEDI"
                    ],
                    "friends": [
                        {
                            "name": "Han Solo",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "Leia Organa",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "C-3PO",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "R2-D2",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        }
                    ]
                },
                {
                    "name": "Han Solo",
                    "appearsIn": [
                        "NEWHOPE",
                        "EMPIRE",
                        "JEDI"
                    ],
                    "friends": [
                        {
                            "name": "Luke Skywalker",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "Leia Organa",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "R2-D2",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        }
                    ]
                },
                {
                    "name": "Leia Organa",
                    "appearsIn": [
                        "NEWHOPE",
                        "EMPIRE",
                        "JEDI"
                    ],
                    "friends": [
                        {
                            "name": "Luke Skywalker",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "Han Solo",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "C-3PO",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        },
                        {
                            "name": "R2-D2",
                            "appearsIn": [
                                "NEWHOPE",
                                "EMPIRE",
                                "JEDI"
                            ]
                        }
                    ]
                }
            ]
        }
    }
}

/**
 * And this query is valid. Let's take a look at some invalid queries...
 * 
 * A fragment cannot refer to itself or create a cycle, as this could result in an unbounded 
 * result! Here's the same query above but without the explicit three levels of nesting:
 */
{
    hero {
        ...NameAndAppearancesAndFriends
    }
}

fragment NameAndAppearancesAndFriends on Character {
    name
    appearsIn
    friends {
        ...NameAndAppearancesAndFriends
    }
}

// Output of above query is:
{
    "errors": [
        {
            "message": "Cannot spread fragment \"NameAndAppearancesAndFriends\" within itself.",
            "locations": [
                {
                    "line": 11,
                    "column": 5
                }
            ]
        }
    ]
}

/**
 * When we query for fields, we have to query for a field that exists on the given type. So as 
 * hero returns a Character, we have to query for a field on Character. That type does not have 
 * a favoriteSpaceship field, so this query is invalid:
 */
# INVALID: favoriteSpaceship does not exist on Character
{
    hero {
        favoriteSpaceship
    }
}

// Output of above query is:
{
    "errors": [
        {
            "message": "Cannot query field \"favoriteSpaceship\" on type \"Character\".",
            "locations": [
                {
                    "line": 4,
                    "column": 5
                }
            ]
        }
    ]
}

/**
 * Whenever we query for a field and it returns something other than a scalar or an enum, we 
 * need to specify what data we want to get back from the field. Hero returns a Character, and 
 * we've been requesting fields like name and appearsIn on it; if we omit that, the query will 
 * not be valid:
 */
# INVALID: hero is not a scalar, so fields are needed 
{
    hero
}

// Output of above query is:
{
    "errors": [
        {
            "message": "Field \"hero\" of type \"Character\" must have a selection of subfields. Did you mean \"hero { ... }\"?",
            "locations": [
                {
                    "line": 3,
                    "column": 3
                }
            ]
        }
    ]
}

/**
 * Similarly, if a field is a scalar, it doesn't make sense to query for additional fields on 
 * it, and doing so will make the query invalid:
 */
# INVALID: name is a scalar, so fields are not permitted
{
    hero {
        name {
            firstCharacterOfName
        }
    }
}

// Output of above query is:
{
    "errors": [
        {
            "message": "Field \"name\" must not have a selection since type \"String!\" has no subfields.",
            "locations": [
                {
                    "line": 4,
                    "column": 10
                }
            ]
        }
    ]
}

/**
 * Earlier, it was noted that a query can only query for fields on the type in question; when 
 * we query for hero which returns a Character, we can only query for fields that exist on Character. 
 * What happens if we want to query for R2-D2s primary function, though?
 */
# INVALID: primaryFunction does not exist on Character
{
    hero {
        name
        primaryFunction
    }
}

// Output of above query is:
{
    "errors": [
        {
            "message": "Cannot query field \"primaryFunction\" on type \"Character\". Did you mean to use an inline fragment on \"Droid\"?",
            "locations": [
                {
                    "line": 5,
                    "column": 5
                }
            ]
        }
    ]
}

/**
 * That query is invalid, because primaryFunction is not a field on Character. We want some way 
 * of indicating that we wish to fetch primaryFunction if the Character is a Droid, and to ignore 
 * that field otherwise. We can use the fragments we introduced earlier to do this. By setting up 
 * a fragment defined on Droid and including it, we ensure that we only query for primaryFunction 
 * where it is defined.
 */
{
    hero {
        name
        ...DroidFields
    }
}

fragment DroidFields on Droid {
    primaryFunction
}

// Output of above query is:
{
    "data": {
        "hero": {
            "name": "R2-D2",
            "primaryFunction": "Astromech"
        }
    }
}

/**
 * This query is valid, but it's a bit verbose; named fragments were valuable above when we used 
 * them multiple times, but we're only using this one once. Instead of using a named fragment, we 
 * can use an inline fragment; this still allows us to indicate the type we are querying on, but 
 * without naming a separate fragment:
 */
{
    hero {
        name
        ... on Droid {
            primaryFunction
        }
    }
}

// Output of above query is:
{
    "data": {
        "hero": {
            "name": "R2-D2",
            "primaryFunction": "Astromech"
        }
    }
}

/**
 * This has just scratched the surface of the validation system; there are a number of validation 
 * rules in place to ensure that a GraphQL query is semantically meaningful. The specification goes 
 * into more detail about this topic in the "Validation" section, and the validation directory in 
 * GraphQL.js contains code implementing a specification-compliant GraphQL validator.
 */