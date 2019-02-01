import { 
    GraphQLInputObjectType as InputObjectType,
    GraphQLID as IDType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

let inputMovieType = new InputObjectType({
    name: 'MovieInput',
    fields: {
        id: { type: IDType },
        name: { type: StringType },
        year: { type: IntType },
        directorId: { type: IDType }
    }
});

let inputDirectorType = new InputObjectType({
    name: 'DirectorInput',
    fields: {
        id: { type: IDType },
        name: { type: StringType },
        age: { type: IntType }
    }
});

export { inputMovieType, inputDirectorType };