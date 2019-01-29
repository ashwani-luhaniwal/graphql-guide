import { 
    graphql, 
    GraphQLObjectType as ObjectType, 
    GraphQLString as StringType, 
    GraphQLInt as IntType,
    GraphQLID as IDType,
    GraphQLList as ListType,
    GraphQLSchema 
} from 'graphql';
import fetch from 'node-fetch';
import _ from 'lodash';

import { movies, directors } from './data';

// userType
const UserType = new ObjectType({
    name: 'UserType',
    fields: {
        name: {
            type: StringType,
            resolve: () => {
                return 'Ashwani'
            }
        },
        age: {
            type: StringType,
            resolve: () => {
                return '28'
            }
        },
        location: {
            type: StringType,
            resolve: () => {
                return 'Bengaluru'
            }
        }
    }
});

// githubType
const GitHubType = new ObjectType({
    name: 'GitHubType',
    fields: {
        name: {
            type: StringType,
            resolve: (obj) => {
                return obj.name;
            }
        },
        repo_url: {
            type: StringType,
            resolve: (obj) => {
                return obj.repos_url;
            }
        },
        bio: {
            type: StringType,
            resolve: (obj) => {
                return obj.bio;
            }
        }
    }
});

// movieType
const movieType = new ObjectType({
    name: 'Movie',
    fields: {
        id: { 
            type: IDType 
        },
        name: { 
            type: StringType 
        },
        year: { 
            type: IntType 
        },
        directorId: { 
            type: IDType 
        }
    }
});

// directorType
const directorType = new ObjectType({
    name: 'Director',
    fields: {
        id: {
            type: IDType
        },
        name: {
            type: StringType
        },
        age: {
            type: IntType
        },
        movies: {
            type: new ListType(movieType),
            args: {
                id: {
                    type: IntType
                }
            },
            resolve: (source, args) => {
                return _.filter(movies, { directorId: args.id });
            }
        }
    }
});

// define the query
const Schema = new GraphQLSchema({
    query: new ObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: StringType,
                resolve: () => {
                    return `Hello World`;
                }
            },
            movie: {
                type: movieType,
                args: {
                    id: {
                        type: IntType
                    }
                },
                resolve: (source, args) => {
                    return _.find(movies, { id: args.id })
                }
            },
            director: {
                type: directorType,
                args: {
                    id: {
                        type: IntType
                    }
                },
                resolve: () => {
                    return _.find(directors, { id: args.id });
                }
            },
            user: {
                type: UserType,
                resolve: (root, args) => Promise.resolve({}) 
            },
            github: {
                type: GitHubType,
                args: {
                    name: {
                        type: StringType
                    }
                },
                resolve: (root, args) => {
                    fetch(`https://api.github.com/users/${args.name}`)
                        .then(x => x.json());
                }
            }
        }
    })
});

export default Schema;