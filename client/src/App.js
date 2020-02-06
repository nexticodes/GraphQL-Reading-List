import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup.
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

function App() {
  return (
    // Allows Apollo to inject data into the components surrounded by the ApolloProvider tag.
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ernie's Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
