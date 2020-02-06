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
    console.log(props);
    return (
        <div>
            <ul id="book-list">
                <li>Book 1</li>
            </ul>
        </div>
    )
};

// Graphql binds getBooksQuery to BookList component.
export default graphql(getBooksQuery)(BookList);