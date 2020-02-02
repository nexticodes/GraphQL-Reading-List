// Schema describes data in the graph
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// Dummy data removed.

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
                // console.log(parent);
                // return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId)
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
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books.filter(bk => bk.authorId === parent.id)
                return Book.find({
                    authorId: parent.id
                })
            }
        }
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
                // return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },

        // Author query
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },

        // BookS Query (FOR A LIST OF BOOKS)
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
                // No query object means return everything
                return Book.find({});
            }
        },

        // AuthorS query
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});