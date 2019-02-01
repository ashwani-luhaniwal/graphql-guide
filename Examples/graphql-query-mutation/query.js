import { 
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLSchema
} from 'graphql';
import _ from 'lodash';

import { movieType, directorType } from './types';
import { movies, directors } from './data';

import mutationType from './mutation';

// define query
const Schema = new GraphQLSchema({
    query: new ObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: StringType,
                resolve: () => {
                    return "Hello World";
                }
            },
            movie: {
                type: movieType,
                args: {
                    id: { type: IntType }
                },
                resolve: (source, args) => {
                    return _.find(movies, { id: args.id });
                }
            },
            director: {
                type: directorType,
                args: {
                    id: { type: IntType }
                },
                resolve: (source, args) => {
                    return _.find(directors, { id: args.id });
                }
            }
        }
    }),
    mutation: mutationType
});

export default Schema;