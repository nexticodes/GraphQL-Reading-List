import React from 'react';
import {graphql} from 'react-apollo';

import {getBooksQuery} from './../queries/queries';

function BookList(props){

    const displayBooks = () => {
        let data = props.data;
        if (data.loading){
            return (
                <div>Loading books...</div>
            );
        } else {
            return data.books.map((book, i) => {
                return (
                    <li key={i}>{book.name}</li>
                );
            });
        };
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    )
};

// Graphql binds getBooksQuery to BookList component.
export default graphql(getBooksQuery)(BookList);