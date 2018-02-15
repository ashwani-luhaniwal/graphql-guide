const APP_SECRET = 'GraphQL-is-aw3some';
const jwt = require('jsonwebtoken');

/**
 * The context argument has a request property representing the incoming HTTP request which 
 * carries the query or mutation. Consequently, the request property provides access to the 
 * headers of the incoming HTTP request. As authentication tokens are expected to be carried 
 * in the Authorization header field, you can retrieve the value of that field with 
 * context.request.get('Authorization').
 * 
 * Additionally, the actual authentication token is prepended with the following string "Bearer ", 
 * so in order to access the raw token you need to get rid of that prefix. Once the token 
 * was retrieved, it can be verified using the jsonwebtoken library. Note that jwt.verify 
 * returns a JSON object with the encoded payload (or throws an error in case the token is 
 * not valid). Since the payload contains the id of the User the token was issued for, you 
 * now finally have access to a valid id of an authenticated User.
 * 
 * Finally, to make this work there are two small things left to. First, you need to import jwt 
 * as it’s used inside the getUserId function, then of course make sure the function gets exported. 
 */
function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
}