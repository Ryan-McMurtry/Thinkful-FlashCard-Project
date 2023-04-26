import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };

  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [ card, setCard ] = useState(initialCardState);
  const [ deck, setDeck ] = useState(initialDeckState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        const deckResponse = await readDeck(deckId, abortController.signal);

        setDeck(deckResponse);
        setCard(cardResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      }
    }
    fetchData();
  }, []);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  function handleCancel(){
    history.push(`/decks/${deckId}`)
  }

  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({...card}, abortController.signal)
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId - 1}</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h2>Edit Card</h2>
        <div className="form-group">
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={card.front}
          />
        </div>

        <div className="form-group">
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={card.back}
          />
        </div>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;
