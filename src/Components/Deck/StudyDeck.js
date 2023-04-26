import React, {useEffect, useState} from "react";
import { readDeck } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";


function StudyDeck(){
    const history = useHistory();
    const { deckId } = useParams();
    const [deckView, setDeckView] = useState({});
    const [cardList, setCardList] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);
    const[front, setFront] = useState(false);
      
    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    useEffect(() => {
      const abortController = new AbortController();
      async function singleDeck() {
        try {
          const fetch = await readDeck(deckId);
          setDeckView(fetch);
          setCardList(fetch.cards);
          console.log(fetch);
          console.log(fetch.cards);
        } catch (error) {
          console.log("Sorry something went wrong", error);
        }
        return () => {
          abortController.abort();
        };
      }

      singleDeck();
    }, [deckId]);

    const flipCard = () => setFront(!front);

    function handleNext(){
      setCardNumber((currentCard) => 
        currentCard < (cardList.length - 1)
        ? currentCard + 1
        : (window.confirm("Restart Cards?")
          ? currentCard = 0
          : history.go(0)
          )
      )
    }

    function handlePrevious() {
      setCardNumber((currentCard) => currentCard - 1)
    }
    console.log(cardList);

    if(cardList.length < 3){
        return (
          <>
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to={`/decks/${deckView.id}`}>{deckView.name}</Link>
                  </li>
                  <li className="breadcrumb-item active">Study</li>
                </ol>
              </nav>
            </div>
            <div>
              <h1>{deckView.name} : Study</h1>
            </div>
            <div class="container">
              <h2>Not Enough Cards</h2>

              <div>
                <p>You need at least three cards to Study</p>
                <p>There are {cardList.length} cards in this deck</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddCard}
              >
                Add Card +
              </button>
            </div>
          </>
        );
    } else {
          return (
            <div>
              <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      <Link to={`/decks/${deckView.id}`}>{deckView.name}</Link>
                    </li>
                    <li className="breadcrumb-item active">Study</li>
                  </ol>
                </nav>
              </div>
              <h1>Study: {deckView.name}</h1>
              <div class="row">
                <div class="col-sm-12 p-0">
                  <div class="card">
                    <div class="card-body">
                      <div class="container">
                        <h3>
                          Card {cardNumber + 1} of {cardList.length}
                        </h3>
                        <p>
                          {front
                            ? `Front: ${cardList[cardNumber].front}`
                            : `Back: ${cardList[cardNumber].back}`}
                        </p>
                        <button
                          className="btn btn-secondary mx-1"
                          onClick={flipCard}
                        >
                          Flip
                        </button>
                        {front && (
                          <button
                            className="btn btn-primary mx-1"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        )}
                        {cardNumber !== 0 && (
                          <button
                            className="btn btn-primary mx-1"
                            onClick={handlePrevious}
                          >
                            Previous
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }

    
}

export default StudyDeck;