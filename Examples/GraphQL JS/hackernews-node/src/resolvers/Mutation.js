const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

function post(parent, { url, description }, context, info) {
    const userId = getUserId(context);
    return context.db.mutation.createLink(
        { data: { url, description, postedBy: { connect: { id: userId } } } },
        info,
    );
}

/**
 * In the signup resolver, you’re first creating the hash of the password using bcryptjs. Next, 
 * you’re using the Prisma instance from context to create a new User node in the database. 
 * Finally, you’re returning the AuthPayload which contains a token and the newly created user 
 * object.
 * 
 * Note: In case you wondered whether you should include a check for duplicate email addresses 
 * before invoking the createUser mutation in the signup resolver, this is not necessary. This 
 * requirement is already taken care of since the email field in your data model is annotated 
 * with the @unique directive. For fields that are annotated with this directive, Prisma ensures 
 * that no two nodes with the same values for these fields exist.
 */
async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser({
        data: { ...args, password },
    })

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

/**
 * Here’s what’s happening in this function: You first use the email that was provided as an 
 * input argument to the login mutation to try and retrieve a User node from the Prisma database 
 * service. If this is not successful, you return an error indicating that a User with the 
 * provided email does not exist. If it does exist and was succesfully retrieved from the 
 * database, you’re using bcryptjs to compare the password hashes. If the comparison fails, 
 * you’re again returning an error. This time indicating that the provided password is invalid. 
 * Finally, if the password check succeeds, you’re again generating an authentication token and 
 * return it along with the user object (as required by the AuthPayload type in your application 
 * schema).
 */
async function login(parent, args, context, info) {
    const user = await context.db.query.user({ where: { email: args.email } });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

/**
 * In the vote resolver, you’re first retrieving the userId from the HTTP header again (using 
 * the familiar getUserId function you just implemented) so you can create the Vote on behalf 
 * of an actual User. What follows is a check to ensure the Link to be voted for actually exists. 
 * Lastly, the resolver invokes the createVote mutation from the Prisma API to create a new Vote 
 * in the database connecting the given User and Link nodes.
 */
async function vote(parent, args, context, info) {
    const userId = getUserId(context);
    const { linkId } = args;
    const linkExists = await context.db.exists.Vote({
        user: { id: userId },
        link: { id: linkId },
    });
    if (linkExists) {
        throw new Error(`Already voted for link: ${linkId}`);
    }

    return context.db.mutation.createVote(
        {
            data: {
                user: { connect: { id: userId } },
                link: { connect: { id: linkId } },
            },
        },
        info,
    )
}

module.exports = {
    post,
    signup,
    login,
    vote,
}