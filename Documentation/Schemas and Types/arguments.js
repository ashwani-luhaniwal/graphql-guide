/**
 * ----------------------------
 * Arguments in GraphQL Schema
 * ----------------------------
 * Every field on a GraphQL object type can have zero or more arguments, for example the length 
 * field below:
 */
type Starship {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
}

/**
 * All arguments are named. Unlike languages like JavaScript and Python where functions take a list 
 * of ordered arguments, all arguments in GraphQL are passed by name specifically. In this case, the 
 * length field has one defined argument, unit.
 * 
 * Arguments can be either required or optional. When an argument is optional, we can define a 
 * default value - if the unit argument is not passed, it will be set to METER by default.
 */