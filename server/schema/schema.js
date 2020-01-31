// Schema describes data in the graph
const graphql = require('graphql');
const _ = require('lodash');

// Dummy data :D
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
  ]

// Dummy data for authors
const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
  ]


// Define type.
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',

    // Fields need to have a function value.
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // resolve function finds in the author array 
                // an author with an id called id that is the SAME
                // as the parent.authorId OR current book we just queried author ID.
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',

    // Fields need to have a function value.
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
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
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // CODE TO GET DATA FROM DB / OTHER SOURCE
                // we return what we want to send back.
                return _.find(books, {id: args.id});
            }
        },

        // Author query
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});