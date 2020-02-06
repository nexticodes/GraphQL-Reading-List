import React from 'react';
import {graphql} from 'react-apollo';

import {getAuthorsQuery} from './../queries/queries';

function AddBook(props) {
    const displayAuthors = () => {
        let data = props.data;
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

    return (
        <form id="add-book">

        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
            {displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    )
}

// GraphQL binds getAuthorsQuery to AddBook component.
export default graphql(getAuthorsQuery)(AddBook);