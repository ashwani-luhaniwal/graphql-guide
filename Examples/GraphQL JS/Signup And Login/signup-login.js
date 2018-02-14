/**
 * -----------------
 * Signup and Login
 * -----------------
 * In this section, you’ll learn how to implement authentication functionality for your backend.
 * 
 * ---------------------
 * Securing data access
 * ---------------------
 * Before diving into the implementation, you have to understand how and where authentication plays 
 * a role in your server-side setup. Most notably, there are two areas where authentication and 
 * data protection are important:
 *  - Securing access to your Prisma database service
 *  - Offering login functionality to your application’s users
 * 
 * ------------------------------------------------
 * Securing access to your Prisma database service
 * ------------------------------------------------
 * When accessing a Prisma database service (over HTTP), you need to authenticate by attaching an 
 * authentication token to the Authorization field of your HTTP header. Otherwise, the request is 
 * going to fail.
 * 
 * Note that you can temporarily disable the service’s requirement for authentication by setting 
 * the "disableAuth" property in your prisma.yml to true. Only then you can send requests to the 
 * service without providing the Authorization header field.
 * 
 * But where do you get this authentication token from? Well, you can actually generate it yourself, 
 * it’s a JSON web token (JWT) that needs to be signed with the Prisma service secret which is 
 * specified as the secret property in your prisma.yml.
 * 
 * In most cases however (when using prisma-binding or the Prisma CLI) the JWT token is actually 
 * generated for you so you don’t have to worry about that at all and all you need to do is 
 * initally provide the secret. This is also why the Prisma instance in index.js receives the 
 * secret as a constructor argument, so it can generate JWTs under the hood. Another example is 
 * the prisma playground command from the CLI. This will generate a token and set it as the 
 * Authorization header when the Playground is opened, so you can start sending queries and 
 * mutations right away.
 * 
 * ----------------------------------------------------------
 * Offering login functionality to your application's users
 * ----------------------------------------------------------
 * All right! So now you understand what the secret in prisma.yml is actually used for and why 
 * it’s passed as an argument when to the Prisma constructor. This however only protects your 
 * database from unauthorized access, but it doesn’t help in offering authentication functionality 
 * to the users of your application. This you need to implement yourself!
 * 
 * Note that you can also try the node-advanced GraphQL boilerplate project which comes with 
 * predefined authentication functionality.
 * 
 * In general, GraphQL does not require a specific authentication method! It’s completely up to 
 * the developer to decide how they want to implement the authentication flow for their GraphQL 
 * server.
 * 
 * You’ll also use JWT for user authentication in your app. This means you need to come up with 
 * another secret which will be your application secret. This secret is used to issue 
 * authentication tokens to your users and validate them.
 * 
 * For simplicity, you’ll define your application secret as a global constant in this tutorial. 
 * In real-world applications, you should always make sure your secrets are properly protected, 
 * e.g. by setting them as environment variables rather than hardcoding them in your source files!
 * 
 * Signup
 * -------
 * To signup (i.e. create a new User node), the following steps need to be performed:
 *  - The server receives a signup mutation with the email and password (and name) of a new user
 *  - The server creates a new user in the database and stores the name and email as well as a 
 *      hashed version of the password
 *  - The server generates an authentication token (JWT) by signing the token’s payload (which is 
 *      the user’s id) with the application secret
 *  - The server returns the authentication token and user info to the client who made the request
 * 
 * Login
 * ------
 *  - The server receives a login mutation with the email and password of an existing user
 *  - The server compares the hashed version of the password that’s stored with the password 
 *      that was received in the login mutation
 *  - If the passwords match, the server generates an authentication token (JWT) by signing the 
 *      token’s payload (which is user’s id) with the application secret
 *  - The server returns the authentication token and user info to the client who made the request
 */