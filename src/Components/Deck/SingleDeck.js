import React, { useEffect, useState } from "react";
import { deleteDeck, readDeck, deleteCard } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function SingleDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  async function handleAddCard() {
    history.push(`/decks/${deckId}/cards/new`);
  }

  async function handleEditCard(card) {
    history.push(`/decks/${deckId}/cards/${card.id}/edit`)
  }

  async function handleEditDeck() {
    history.push(`/decks/${deckId}/edit`)
  }

  async function handleStudyDeck() {
    history.push(`/decks/${deckId}/study`)
  }

  useEffect(() => {
    async function getDeck() {
      const fetch = await readDeck(deckId);
      console.log(fetch);
      setDeck(fetch);
      setCards(fetch.cards)
    }
    getDeck();
  }, []);

  async function deleteHandler() {
    if (
      window.confirm("Delete this deck? You will not be able to recover it")
    ) {
      history.push("/");
      return await deleteDeck(deckId);
    }
  }

  async function deleteCardHandler(card) {
    if (
      window.confirm("Delete this card? You will not be able to recover it")
    ) {

      try {
        history.go(0);
        return await deleteCard(card.id);
      } catch(error) {
        console.error("Something went wrong", error);
      }
    }
  }


  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">{deck.name}</li>
      </ol>
      <div className="card-body">
        <h2 className="card-title">{deck.name}</h2>
        <p>{deck.description}</p>

        <div className="d-flex row">
          <div className="p-2">
            <button
              onClick={() => handleEditDeck()}
              className="btn btn-secondary mx-1"
            >
              Edit
            </button>
          </div>

          <div className="p-2">
            <button
              onClick={() => handleStudyDeck()}
              className="btn btn-primary mx-1"
            >
              Study
            </button>
          </div>

          <div className="p-2">
            <button
              onClick={() => handleAddCard()}
              className="btn btn-primary mx-1 "
            >
              Add Cards +
            </button>
          </div>

          <div class="ml-auto p-2">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>

        <h1>Cards</h1>
        {cards.map((card) => {
          return (
            <div className="card-deck" key={card.id}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">{card.front}</div>
                    <div className="col">{card.back}</div>
                  </div>
                  <div className="container-row">
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => handleEditCard(card)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => deleteCardHandler(card)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );


}

export default SingleDeck;
