const express = require('express');
const graphqlHTTP = require('express-graphql');

// import schema
const schema = require('./schema/schema');

const app = express();

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