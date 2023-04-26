import React, { useState } from "react";
import { createDeck } from "../../utils/api/index";
import { Link, useHistory } from "react-router-dom";


function DeckForm() {
    const history = useHistory();

    // initialize form data to a blank value
    const initialFormState = {
        name: "",
        description: "",
        cards: [],
    };

    const [formData, setFormData] = useState({...initialFormState});

    // add new form data to existing data

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        const response = await createDeck({...formData});
        console.log("Submitted:", formData);
        setFormData(response);
        setFormData({...initialFormState});
        console.log(response);
        event.target.reset();
        history.push(`/decks/${response.id}`);
    }

    return (
      <div>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Deck
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <h1>Create Deck</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" for="formInput">
                Name
                <input
                  id="formInput"
                  type="text"
                  name="name"
                  className="container-fluid"
                  placeholder="Deck Name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="description" for="formTextArea">
                Description
                <textarea
                  id="formTextArea"
                  type="text"
                  name="description"
                  className="container-fluid"
                  rows="3"
                  placeholder="Brief description of the deck"
                  onChange={handleChange}
                  value={formData.description}
                />
              </label>
            </div>
            
            <button
              type="button"
              value="Cancel"
              className="btn btn-secondary btn-lg"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              value="Submit"
              className="btn btn-primary btn-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );

}


export default DeckForm;