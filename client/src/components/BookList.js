import React, {useState} from 'react';
import {graphql} from 'react-apollo';

import {getBooksQuery} from './../queries/queries';

import BookDetails from './BookDetails';

function BookList(props){

    const [selectedBook, setSelectedBook] = useState({});

    const displayBooks = () => {
        let data = props.data;
        if (data.loading){
            return (
                <div>Loading books...</div>
            );
        } else {
            return data.books.map(book=> {
                return (
                    <li key={book.id} onClick={e => setSelectedBook(book.id)}>{book.name}</li>
                );
            });
        };
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks(selectedBook)}
            </ul>
            <BookDetails selectedBookId={selectedBook}/>
        </div>
    )
};

// Graphql binds getBooksQuery to BookList component.
export default graphql(getBooksQuery)(BookList);