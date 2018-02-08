/**
 * --------------------------
 * Operation Name in GraphQL
 * --------------------------
 * Up until now, we have been using a shorthand syntax where we omit both the query keyword and 
 * the query name, but in production apps it's useful to use these to make our code less ambiguous. 
 * You'll need these optional parts to a GraphQL operation if you want to execute something other than 
 * a query or pass dynamic variables.
 * 
 * Here’s an example that includes the keyword query as operation type and HeroNameAndFriends as 
 * operation name :
 */
query HeroNameAndFriends {
    hero {
        name
        friends {
            name
        }
    }
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
 * The operation type is either query, mutation, or subscription and describes what type of operation 
 * you're intending to do.
 * 
 * The operation name is a meaningful and explicit name for your operation. It can be very useful for 
 * debugging and server-side logging reasons. When something goes wrong either in your network logs or 
 * your GraphQL server, it is easier to identify a query in your codebase by name instead of trying to 
 * decipher the contents. Think of this just like a function name in your favorite programming language. 
 * For example, in JavaScript we can easily work only with anonymous functions, but when we give a 
 * function a name, it's easier to track it down, debug our code, and log when it's called. In the 
 * same way, GraphQL query and mutation names, along with fragment names, can be a useful debugging 
 * tool on the server side to identify different GraphQL requests.
 */