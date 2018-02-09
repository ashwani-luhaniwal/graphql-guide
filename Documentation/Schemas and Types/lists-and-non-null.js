/**
 * -------------------------------------
 * Lists and Non Null in GraphQL Schema
 * -------------------------------------
 * Object types, scalars, and enums are the only kinds of types you can define in GraphQL. But when 
 * you use the types in other parts of the schema, or in your query variable declarations, you can 
 * apply additional type modifiers that affect validation of those values. Let's look at an example:
 */
type Character {
    name: String!
    appearsIn: [Episode]!
}

/**
 * Here, we're using a String type and marking it as Non-Null by adding an exclamation mark, ! after 
 * the type name. This means that our server always expects to return a non-null value for this 
 * field, and if it ends up getting a null value that will actually trigger a GraphQL execution 
 * error, letting the client know that something has gone wrong.
 * 
 * The Non-Null type modifier can also be used when defining arguments for a field, which will cause 
 * the GraphQL server to return a validation error if a null value is passed as that argument, 
 * whether in the GraphQL string or in the variables.
 */
query DroidById($id: ID!) {
    droid(id: $id) {
        name
    }
}

// Input query syntax is:
{
    "id": null
}

// Output of above query is:
{
    "errors": [
        {
            "message": "Variable \"$id\" of required type \"ID!\" was not provided.",
            "locations": [
                "line": 1,
                "column": 17
            ]
        }
    ]
}

/**
 * Lists work in a similar way: We can use a type modifier to mark a type as a List, which 
 * indicates that this field will return an array of that type. In the schema language, this is 
 * denoted by wrapping the type in square brackets, [ and ]. It works the same for arguments, where 
 * the validation step will expect an array for that value.
 * 
 * The Non-Null and List modifiers can be combined. For example, you can have a List of Non-Null 
 * Strings:
 */
myField: [String!]

// This means that the list itself can be null, but it can't have any null members.
myField: null   // valid
myField: []     // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b']   // error

// let's say we defined a Non-Null List of Strings:
myField: [String]!

// This means that the list itself cannot be null, but it can contain null values:
myField: null   // error
myField: []     // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b']   // valid

// You can arbitrarily nest any number of Non-Null and List modifiers, according to your needs