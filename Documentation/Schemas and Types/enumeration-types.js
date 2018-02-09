/**
 * ------------------------------------
 * Enumeration Types in GraphQL Schema
 * ------------------------------------
 * Also called Enums, enumeration types are a special kind of scalar that is restricted to a 
 * particular set of allowed values. This allows you to:
 *  - Validate that any arguments of this type are one of the allowed values
 *  - Communicate through the type system that a field will always be one of a finite set of values
 * 
 * Here's what an enum definition might look like in the GraphQL schema language:
 */
enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
}

/**
 * This means that wherever we use the type Episode in our schema, we expect it to be exactly 
 * one of NEWHOPE, EMPIRE, or JEDI.
 * 
 * Note that GraphQL service implementations in various languages will have their own 
 * language-specific way to deal with enums. In languages that support enums as a first-class 
 * citizen, the implementation might take advantage of that; in a language like JavaScript with 
 * no enum support, these values might be internally mapped to a set of integers. However, these 
 * details don't leak out to the client, which can operate entirely in terms of the string names 
 * of the enum values.
 */