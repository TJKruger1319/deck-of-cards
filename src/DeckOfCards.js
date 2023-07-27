import React, { useState, useEffect } from "react";
import axios from "axios";


async function getDeckId() {
        const deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        return deck.data.deck_id;
    }
let deckId =  await getDeckId();

function Cards() {
    const [card, setCard] = useState(null);
    const [outOfCards, setOutOfCards] = useState(false);

    async function getCard() {
        const newCard = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        setCard(newCard);
    }
    
    
    useEffect(function getOutOfCards() {
        if (card) {
            let remaining = card.data.remaining;
            if (remaining === 0) {
                setOutOfCards(true);
                setCard(null);
            }
        }
    })
    
    return (
        <div>
            <button onClick={getCard}>Draw a card</button>
            <img src={card ? card.data.cards[0].image : ""} alt=""/>
            <p>{outOfCards ? "End of the deck" : ""}</p>
        </div>
    );

}

export default Cards;