/**
 * ----------------------------
 * GraphQL - Schemas and Types
 * ----------------------------
 * On this page, you'll learn all you need to know about the GraphQL type system and how it 
 * describes what data can be queried. Since GraphQL can be used with any backend framework or 
 * programming language, we'll stay away from implementation-specific details and talk only about 
 * the concepts.
 * 
 * ------------
 * Type system
 * ------------
 * If you've seen a GraphQL query before, you know that the GraphQL query language is basically 
 * about selecting fields on objects. So, for example, in the following query:
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
 *      - We start with a special "root" object
 *      - We select the hero field on that
 *      - For the object returned by hero, we select the name and appearsIn fields
 * 
 * Because the shape of a GraphQL query closely matches the result, you can predict what the query 
 * will return without knowing that much about the server. But it's useful to have an exact 
 * description of the data we can ask for - what fields can we select? What kinds of objects might 
 * they return? What fields are available on those sub-objects? That's where the schema comes in.
 * 
 * Every GraphQL service defines a set of types which completely describe the set of possible data 
 * you can query on that service. Then, when queries come in, they are validated and executed 
 * against that schema.
 * 
 * --------------
 * Type Language
 * --------------
 * GraphQL services can be written in any language. Since we can't rely on a specific programming 
 * language syntax, like JavaScript, to talk about GraphQL schemas, we'll define our own simple 
 * language. We'll use the "GraphQL schema language" - it's similar to the query language, and 
 * allows us to talk about GraphQL schemas in a language-agnostic way.
 */