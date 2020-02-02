const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

// import schema
const schema = require('./schema/schema');

const app = express();

// Connect to mLab database
// Make sure to replace my DB string and Creds with my own.
mongoose.connect('mongodb+srv://nexticus_gql:test123@cluster0-26anc.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to database!');
})

// Middleware
// Because JS doesn't inherently understand GraphQL, make express use a middleware that will
// pass all graphql queries made into the /graphql route TO the graphqlHTTP function.
app.use('/graphql', graphqlHTTP({
    // Options (REQUIRED)
    schema,
    graphiql: true,
}))

app.listen(4000, () => {
    console.log('Listening for requests on port 4000!');
})