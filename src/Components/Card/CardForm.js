import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";




function CardForm({handleChange, handleSubmit, card, newCard}) {


    if(card){
        return (
        <>
            <form onSubmit={handleSubmit}>
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

            <button className="btn btn-primary mx-1" type="submit">
                Save
            </button>
            </form>
        </>
    );
    }
    if(newCard){
        return (
            <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Front</label>
                <textarea
                    id="front"
                    name="front"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={newCard.front}
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
                    value={newCard.back}
                />
                </div>

                <button className="btn btn-primary mx-1" type="submit">
                Save
                </button>
            </form>
            </>
        );

    }


}

export default CardForm;