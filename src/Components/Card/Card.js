import { Switch, Route} from "react-router-dom";
import React from "react";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Card() {
  return (
    <div>
      <Switch>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
      </Switch>
    </div>
  );
}

export default Card;
