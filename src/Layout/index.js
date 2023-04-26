import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Switch, Route} from "react-router-dom";
import CreateDeckButton from "../Components/Deck/CreateDeckButton";
import DeckList from "../Components/Deck/DeckList";
import DeckForm from "../Components/Deck/DeckForm";
import EditDeck from "../Components/Deck/EditDeck";
import SingleDeck from "../Components/Deck/SingleDeck";
import StudyDeck from "../Components/Deck/StudyDeck";
import Card from "../Components/Card/Card";


function Layout() {
  return (
    <>
      <div>
        <Header />
        <div className="container">
          {/* TODO: Implement the screen starting here */}
          <Switch>
            <Route exact path="/">
              <CreateDeckButton />
              <DeckList />
            </Route>

            <Route path="/decks/new">
              <DeckForm />
            </Route>

            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>

            <Route path="/decks/:deckId/study">
              <StudyDeck />
            </Route>

            <Route exact path="/decks/:deckId">
              <SingleDeck />
            </Route>

            <Route path="/decks/:deckId/cards/new">
              <Card />
            </Route>

            <Route path="/decks/:deckId/cards/:cardId/edit">
              <Card />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Layout;
