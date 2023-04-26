import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  const initialDeckState = {
    name: "",
    description: "",
  };
  const [deckEdit, setDeckEdit] = useState(initialDeckState);

  function handleChange({ target }) {
    setDeckEdit({
      ...deckEdit,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function editDeck() {
      try {
        const fetch = await readDeck(deckId);
        setDeckEdit(fetch);
        console.log(fetch);
      } catch (error) {
        console.log("Sorry something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    editDeck();
  }, [deckId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateDeck({ ...deckEdit });
    console.log(response);
    setDeckEdit({ ...response });
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
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>Edit Deck</h1>
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
                value={deckEdit.name}
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
                value={deckEdit.description}
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

export default EditDeck;
