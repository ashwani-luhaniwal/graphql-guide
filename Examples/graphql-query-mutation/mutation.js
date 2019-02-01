import { 
    GraphQLObjectType as ObjectType
} from 'graphql';
import _ from 'lodash';

import { movieType, directorType } from './types';
import { inputMovieType, inputDirectorType } from './inputtypes';
import { movies, directors } from './data';

const mutationType = new ObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: movieType,
            args: {
                input: { type: inputMovieType }
            },
            resolve: (source, args) => {
                let movie = {
                    id: args.input.id,
                    name: args.input.name,
                    year: args.input.year,
                    directorId: args.input.directorId
                }

                movies.push(movie);

                return _.find(movies, { id: args.input.id });
            }
        },
        addDirector: {
            type: directorType,
            args: {
                input: { type: inputDirectorType }
            },
            resolve: (source, args) => {
                let director = {
                    id: args.input.id,
                    name: args.input.name,
                    age: args.input.age
                };

                directors.push(director);

                return _.find(directors, { id: args.input.id });
            }
        }
    }
});

export default mutationType;