import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../../utils/api/index";
import { useHistory, Link } from "react-router-dom";

function DeckList() {
    const history = useHistory();
    const [deckList, setDeckList] = useState([]);
    
    useEffect(() => {

        async function deckLayout(){
            const fetch = await listDecks();
            setDeckList(fetch);
        }
        deckLayout()
    }, [])

    console.log(deckList);

    function DeckMap(){
        return (deckList.map((currentDeck, index) => {
            async function deleteHandler() {
                if(window.confirm("Delete this deck? You will not be able to recover it")){
                    history.go(0);
                    return await deleteDeck(currentDeck.id);
                }
            }
        
            return (
              <div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <li key={index} style={{ listStyle: "none" }}>
                            <div className="d-flex justify-content-between">
                              <h3>{currentDeck.name}</h3>
                              <p>{`${currentDeck.cards.length} cards`}</p>
                            </div>
                          </li>
                          <div className="card-text">
                            <p>{`${currentDeck.description}`}</p>
                          </div>
                        </div>
                        <div class="d-flex">
                          <div class="p-2">
                            <Link
                              to={`/decks/${currentDeck.id}`}
                              className="btn btn-secondary"
                            >
                              View
                            </Link>
                          </div>
                          <div class="p-2">
                            <Link
                              to={`/decks/${currentDeck.id}/study`}
                              type="button"
                              className="btn btn-primary"
                            >
                              Study
                            </Link>
                          </div>

                          <div class="ml-auto p-2">
                            <button
                              onClick={deleteHandler}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
            })
        )}

        return(
            <div><DeckMap /></div>
        )



    }



export default DeckList;