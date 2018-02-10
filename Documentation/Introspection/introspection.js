/**
 * -------------------------
 * Introspection in GraphQL
 * -------------------------
 * It's often useful to ask a GraphQL schema for information about what queries it supports. 
 * GraphQL allows us to do so using the introspection system!
 * 
 * We designed the type system, so we know what types are available, but if we didn't, we can 
 * ask GraphQL, by querying the __schema field, always available on the root type of a Query. 
 * Let's do so now, and ask what types are available.
 */
{
    __schema {
        types {
            name
        }
    }
}

// Output of above query is:
{
    "data": {
        "__schema": {
            "types": [
                {
                    "name": "Query"
                },
                {
                    "name": "Episode"
                },
                {
                    "name": "Character"
                },
                {
                    "name": "ID"
                },
                {
                    "name": "String"
                },
                {
                    "name": "Int"
                },
                {
                    "name": "FriendsConnection"
                },
                {
                    "name": "FriendsEdge"
                },
                {
                    "name": "PageInfo"
                },
                {
                    "name": "Boolean"
                },
                {
                    "name": "Review"
                },
                {
                    "name": "SearchResult"
                },
                {
                    "name": "Human"
                },
                {
                    "name": "LengthUnit"
                },
                {
                    "name": "Float"
                },
                {
                    "name": "Starship"
                },
                {
                    "name": "Droid"
                },
                {
                    "name": "Mutation"
                },
                {
                    "name": "ReviewInput"
                },
                {
                    "name": "__Schema"
                },
                {
                    "name": "__Type"
                },
                {
                    "name": "__TypeKind"
                },
                {
                    "name": "__Field"
                },
                {
                    "name": "__InputValue"
                },
                {
                    "name": "__EnumValue"
                },
                {
                    "name": "__Directive"
                },
                {
                    "name": "__DirectiveLocation"
                }
            ]
        }
    }
}

/**
 * Wow, that's a lot of types! What are they? Let's group them:
 *  - Query, Character, Human, Episode, Droid - These are the ones that we defined in our type system.
 *  - String, Boolean - These are built-in scalars that the type system provided.
 *  - __Schema, __Type, __TypeKind, __Field, __InputValue, __EnumValue, __Directive - These all are 
 *      preceded with a double underscore, indicating that they are part of the introspection system.
 * 
 * Now, let's try and figure out a good place to start exploring what queries are available. When 
 * we designed our type system, we specified what type all queries would start at; let's ask the 
 * introspection system about that!
 */
{
    __schema {
        queryType {
            name
        }
    }
}

// Output of above query is:
{
    "data": {
        "__schema": {
            "queryType": {
                "name": "Query"
            }
        }
    }
}

/**
 * And that matches what we said in the type system section, that the Query type is where we will 
 * start! Note that the naming here was just by convention; we could have named our Query type 
 * anything else, and it still would have been returned here had we specified it was the starting 
 * type for queries. Naming it Query, though, is a useful convention.
 * 
 * It is often useful to examine one specific type. Let's take a look at the Droid type:
 */
{
    __type(name: "Droid") {
        name
    }
}

// Output of above query is:
{
    "data": {
        "__type": {
            "name": "Droid"
        }
    }
}

/**
 * What if we want to know more about Droid, though? For example, is it an interface or an object?
 */
{
    __type(name: "Droid") {
        name
        kind
    }
}

// Output of above query is:
{
    "data": {
        "__type": {
            "name": "Droid",
            "kind": "OBJECT"
        }
    }
}

/**
 * kind returns a __TypeKind enum, one of whose values is OBJECT. If we asked about Character 
 * instead we'd find that it is an interface:
 */
{
    __type(name: "Character") {
        name
        kind
    }
}

// Output of above query is:
{
    "data": {
        "__type": {
            "name": "Character",
            "kind": "INTERFACE"
        }
    }
}

/**
 * It's useful for an object to know what fields are available, so let's ask the introspection 
 * system about Droid:
 */
{
    __type(name: "Droid") {
        name
        fields {
            name
            type {
                name
                kind
            }
        }
    }
}

// Output of above query is:
{
    "data": {
        "__type": {
            "name": "Droid",
            "fields": [
                {
                    "name": "id",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL"
                    }
                },
                {
                    "name": "name",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL"
                    }
                },
                {
                    "name": "friends",
                    "type": {
                        "name": null,
                        "kind": "LIST"
                    }
                },
                {
                    "name": "friendsConnection",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL"
                    }
                },
                {
                    "name": "appearsIn",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL"
                    }
                },
                {
                    "name": "primaryFunction",
                    "type": {
                        "name": "String",
                        "kind": "SCALAR"
                    }
                }
            ]
        }
    }
}

/**
 * Those are our fields that we defined on Droid!
 * 
 * id looks a bit weird there, it has no name for the type. That's because it's a "wrapper" type 
 * of kind NON_NULL. If we queried for ofType on that field's type, we would find the ID type there, 
 * telling us that this is a non-null ID.
 * 
 * Similarly, both friends and appearsIn have no name, since they are the LIST wrapper type. We 
 * can query for ofType on those types, which will tell us what these are lists of.
 */
{
    __type(name: "Droid") {
        name
        fields {
            name
            type {
                name
                kind
                ofType {
                    name
                    kind
                }
            }
        }
    }
}

// Output of above query is:
{
    "data": {
        "__type": {
            "name": "Droid",
            "fields": [
                {
                    "name": "id",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL",
                        "ofType": {
                            "name": "ID",
                            "kind": "SCALAR"
                        }
                    }
                },
                {
                    "name": "name",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL",
                        "ofType": {
                            "name": "String",
                            "kind": "SCALAR"
                        }
                    }
                },
                {
                    "name": "friends",
                    "type": {
                        "name": null,
                        "kind": "LIST",
                        "ofType": {
                            "name": "Character",
                            "kind": "INTERFACE"
                        }
                    }
                },
                {
                    "name": "friendsConnection",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL",
                        "ofType": {
                            "name": "FriendsConnection",
                            "kind": "OBJECT"
                        }
                    }
                },
                {
                    "name": "appearsIn",
                    "type": {
                        "name": null,
                        "kind": "NON_NULL",
                        "ofType": {
                            "name": null,
                            "kind": "LIST"
                        }
                    }
                },
                {
                    "name": "primaryFunction",
                    "type": {
                        "name": "String",
                        "kind": "SCALAR",
                        "ofType": null
                    }
                }
            ]
        }
    }
}

/**
 * Let's end with a feature of the introspection system particularly useful for tooling; let's 
 * ask the system for documentation!
 */
{
    __type(name: "Droid") {
        name
        description
    }
}

// Output of above query is:
{
    "data": {
        "__type": {
            "name": "Droid",
            "description": "An autonomous mechanical character in the Star Wars universe"
        }
    }
}

/**
 * So we can access the documentation about the type system using introspection, and create 
 * documentation browsers, or rich IDE experiences.
 * 
 * This has just scratched the surface of the introspection system; we can query for enum values, 
 * what interfaces a type implements, and more. We can even introspect on the introspection system 
 * itself. The specification goes into more detail about this topic in the "Introspection" section, 
 * and the introspection file in GraphQL.js contains code implementing a specification-compliant 
 * GraphQL query introspection system.
 */