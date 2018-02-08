/**
 * --------------------
 * Variables in GraphQL
 * ---------------------
 * So far, we have been writing all of our arguments inside the query string. But in most 
 * applications, the arguments to fields will be dynamic: For example, there might be a dropdown 
 * that lets you select which Star Wars episode you are interested in, or a search field, or a set 
 * of filters.
 * 
 * It wouldn't be a good idea to pass these dynamic arguments directly in the query string, because 
 * then our client-side code would need to dynamically manipulate the query string at runtime, and 
 * serialize it into a GraphQL-specific format. Instead, GraphQL has a first-class way to factor 
 * dynamic values out of the query, and pass them as a separate dictionary. These values are called 
 * variables.
 * 
 * When we start working with variables, we need to do three things:
 *      - Replace the static value in the query with $variableName
 *      - Declare $variableName as one of the variables accepted by the query
 *      - Pass variableName: value in the separate, transport-specific (usually JSON) variables 
 *          dictionary
 */
query HeroNameAndFriends($episode: Episode) {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}

// The variable call is:
{
    "episode": "JEDI"
}

// Output of above query is:
{
    "data": {
        "hero": {
            "name": "R2-D2",
            "friends": [
                {
                    "name": "Luke Skywalker"
                },
                {
                    "name": "Han Solo"
                },
                {
                    "name": "Leia Organa"
                }
            ]
        }
    }
}

/**
 * Now, in our client code, we can simply pass a different variable rather than needing to construct 
 * an entirely new query. This is also in general a good practice for denoting which arguments in our 
 * query are expected to be dynamic - we should never be doing string interpolation to construct 
 * queries from user-supplied values.
 * 
 * ---------------------
 * Variable Definitions
 * ---------------------
 * The variable definitions are the part that looks like ($episode: Episode) in the query above. 
 * It works just like the argument definitions for a function in a typed language. It lists all of 
 * the variables, prefixed by $, followed by their type, in this case Episode.
 * 
 * All declared variables must be either scalars, enums, or input object types. So if you want to 
 * pass a complex object into a field, you need to know what input type that matches on the server. 
 * 
 * Variable definitions can be optional or required. In the case above, since there isn't an ! next 
 * to the Episode type, it's optional. But if the field you are passing the variable into requires a 
 * non-null argument, then the variable has to be required as well.
 * 
 * ------------------
 * Default Variables
 * ------------------
 * Default values can also be assigned to the variables in the query by adding the default value 
 * after the type declaration.
 */
query HeroNameAndFriends($episode: Episode = 'JEDI') {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}

/**
 * When default values are provided for all variables, you can call the query without passing any 
 * variables. If any variables are passed as part of the variables dictionary, they will override 
 * the defaults.
 */