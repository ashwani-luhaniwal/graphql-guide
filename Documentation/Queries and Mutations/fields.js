/**
 * ------------------
 * Fields in GraphQL
 * ------------------
 * At its simplest, GraphQL is about asking for specific fields on objects. Let's start by looking 
 * at a very simple query and the result we get when we run it:
 * 
 *      {
 *          hero {
 *              name
 *          }
 *      }
 * 
 * Output will be
 * 
 *      {
 *          "data": {
 *              "hero": {
 *                  "name": "R2-D2"
 *              }
 *          }
 *      }
 * 
 * You can see immediately that the query has exactly the same shape as the result. This is 
 * essential to GraphQL, because you always get back what you expect, and the server knows exactly 
 * what fields the client is asking for. The field name returns a String type, in this case the name 
 * of the main hero of Star Wars, "R2-D2".
 * 
 * Oh, one more thing - the query above is interactive. That means you can change it as you like and 
 * see the new result. Try adding an appearsIn field to the hero object in the query, and see the 
 * new result.
 * 
 * In the previous example, we just asked for the name of our hero which returned a String, but 
 * fields can also refer to Objects. In that case, you can make a sub-selection of fields for that 
 * object. GraphQL queries can traverse related objects and their fields, letting clients fetch lots 
 * of related data in one request, instead of making several roundtrips as one would need in a 
 * classic REST architecture.
 * 
 *      {
 *          hero {
 *              name
 *              # Queries can have comments!
 *              friends {
 *                  name
 *              }
 *          }
 *      }
 * 
 * Output of above query is:
 * 
 *      {
 *          "data": {
 *              "hero": {
 *                  "name": "R2-D2",
 *                  "friends": [
 *                      {
 *                          "name": "Luke Skywalker"
 *                      },
 *                      {
 *                          "name": "Han Solo",
 *                      }
 *                  ]
 *              }
 *          }
 *      }
 * 
 * Note that in this example, the friends field returns an array of items. GraphQL queries look 
 * the same for both single items or lists of items, however we know which one to expect based on 
 * what is indicated in the schema.
 */