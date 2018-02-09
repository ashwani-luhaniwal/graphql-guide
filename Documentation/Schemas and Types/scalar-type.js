/**
 * -------------------------------
 * Scalar Types in GraphQL Schema
 * -------------------------------
 * A GraphQL object type has a name and fields, but at some point those fields have to resolve to 
 * some concrete data. That's where the scalar types come in: they represent the leaves of the query.
 * In the following query, the name and appearsIn will resolve to scalar types:
 */
{
    hero {
        name
        appearsIn
    }
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
            ]
        }
    }
}

/**
 * We know this because those fields don't have any sub-fields - they are the leaves of the query.
 * 
 * GraphQL comes with a set of default scalar types out of the box:
 *  - Int: A signed 32‐bit integer.
 *  - Float: A signed double-precision floating-point value.
 *  - String: A UTF‐8 character sequence.
 *  - Boolean: true or false.
 *  - ID: The ID scalar type represents a unique identifier, often used to refetch an object or as 
 *      the key for a cache. The ID type is serialized in the same way as a String; however, 
 *      defining it as an ID signifies that it is not intended to be human‐readable.
 * 
 * In most GraphQL service implementations, there is also a way to specify custom scalar types. For 
 * example, we could define a Date type:
 * 
 *      scalar Date
 * 
 * Then it's up to our implementation to define how that type should be serialized, deserialized, 
 * and validated. For example, you could specify that the Date type should always be serialized 
 * into an integer timestamp, and your client should know to expect that format for any date fields.
 */