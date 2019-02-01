import { 
    GraphQLObjectType as ObjectType,
    GraphQLID as IDType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as ListType
} from 'graphql';
import _ from 'lodash';

import { movies } from './data';

// define movieType
const movieType = new ObjectType({
    name: 'Movie',
    fields: {
        id: { type: IDType },
        name: { type: StringType },
        year: { type: IntType },
        directorId: { type: IDType }
    }
});

// define directorType
const directorType = new ObjectType({
    name: 'Director',
    fields: {
        id: { type: IDType },
        name: { type: StringType },
        age: { type: IntType },
        movies: {
            type: new ListType(movieType),
            resolve: (source, args) => {
                return _.filter(movies, { directorId: source.id });
            }
        }
    }
});

export { movieType, directorType };