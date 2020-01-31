// Schema describes data in the graph
const graphql = require('graphql');
const _ = require('lodash');

// Dummy data :D
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
]


// Define type.
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',

    // Fields need to have a function value.
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

// Root queries. Graph data entry point.
// How we initially jump into the graph.
// We'll have multiple root queries eventually.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',

    // One root query can be to get a book, one to get an author
    // one to get all books, and another for all authors.
    // NOT in a function unlike above.
    fields: {
        
        // Book query
        book: {

            // Type of data is a BookType.
            // Having args mean that the query will require arguments to be passed along.
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // CODE TO GET DATA FROM DB / OTHER SOURCE
                // we return what we want to send back.
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});