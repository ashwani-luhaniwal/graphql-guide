/**
 * ---------------------
 * Arguments in GraphQL
 * ---------------------
 * If the only thing we could do was traverse objects and their fields, GraphQL would already be 
 * a very useful language for data fetching. But when you add the ability to pass arguments to 
 * fields, things get much more interesting.
 */
{
    human(id: "1000") {
        name
        height
    }
}

// Output of above query is:

{
    "data": {
        "human": {
            "name": "Ashwani Luhaniwal",
            "height": 1.72
        }
    }
}

/**
 * In a system like REST, you can only pass a single set of arguments - the query parameters and 
 * URL segments in your request. But in GraphQL, every field and nested object can get its own set 
 * of arguments, making GraphQL a complete replacement for making multiple API fetches. You can even 
 * pass arguments into scalar fields, to implement data transformations once on the server, instead 
 * of on every client separately.
 */

{
    human(id: "1000") {
        name
        height(unit: FOOT)
    }
}

// Output of above query is:

{
    "data": {
        "human": {
            "name": "Ashwani Luhaniwal",
            "height": 5.6430448
        }
    }
}

/**
 * Arguments can be of many different types. In the above example, we have used an Enumeration 
 * type, which represents one of a finite set of options (in this case, units of length, either 
 * METER or FOOT). GraphQL comes with a default set of types, but a GraphQL server can also declare 
 * its own custom types, as long as they can be serialized into your transport format.
 */