import React, {useState} from 'react';
import {graphql} from 'react-apollo';

// Because compose has been removed from react-apollo and compose is basically the same as flowRight from lodash..
import {flowRight as compose} from 'lodash';

import {getAuthorsQuery, addBookMutation} from './../queries/queries';

function AddBook(props) {

    // Declare state slices. You may use state with classes but I want to use react hooks for this.
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const displayAuthors = () => {
        let data = props.getAuthorsQuery;
        if (data.loading){
            return (
                <option>Loading Authors...</option>
            )
        } else {
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    const submitForm = e => {
        e.preventDefault();
        props.addBookMutation({
            variables:{
                // ES6
                // name,
                // genre,
                // authorId
                name: name,
                genre: genre,
                authorId: authorId
            }
        });
    }

    return (
        <form id="add-book" onSubmit={submitForm}>

            <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            
            <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>

            <div className="field">
            <label>Author:</label>
            <select onChange={(e) => setAuthorId(e.target.value)}>
                <option>Select Author</option>
                {displayAuthors()}
            </select>
            </div>

            <button>+</button>

        </form>
    )
}

// GraphQL binds getAuthorsQuery to AddBook component.
// Only for one query.
// export default graphql(getAuthorsQuery)(AddBook);

// IF MULTIPLE QUERIES, USE COMPOSE LIKE SO.
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);