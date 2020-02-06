import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`;

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