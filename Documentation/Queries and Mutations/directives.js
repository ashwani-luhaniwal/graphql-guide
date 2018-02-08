/**
 * ----------------------
 * Directives in GraphQL
 * ----------------------
 * We discussed above how variables enable us to avoid doing manual string interpolation to construct 
 * dynamic queries. Passing variables in arguments solves a pretty big class of these problems, but 
 * we might also need a way to dynamically change the structure and shape of our queries using 
 * variables. For example, we can imagine a UI component that has a summarized and detailed view, 
 * where one includes more fields than the other.
 */
query Hero($episode: Episode, $withFriends: Boolean!) {
    hero(episode: $episode) {
        name
        friends @include(if: $withFriends) {
            name
        }
    }
}

// Query syntax is:
{
    "episode": "JEDI",
    "withFriends": false
}
    
// Output of above query is:
{
    "data": {
        "hero": {
            "name": "R2-D2"
        }
    }
}

/**
 * We needed to use a new feature in GraphQL called a directive. A directive can be attached to a 
 * field or fragment inclusion, and can affect execution of the query in any way the server desires. 
 * The core GraphQL specification includes exactly two directives, which must be supported by any 
 * spec-compliant GraphQL server implementation:
 *      - @include(if: Boolean) Only include this field in the result if the argument is true.
 *      - @skip(if: Boolean) Skip this field if the argument is true.
 * 
 * Directives can be useful to get out of situations where you otherwise would need to do string 
 * manipulation to add and remove fields in your query. Server implementations may also add 
 * experimental features by defining completely new directives.
 */