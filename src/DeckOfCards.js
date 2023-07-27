import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


async function getDeckId() {
        const deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        return deck.data.deck_id;
    }
let deckId =  await getDeckId();

function Cards() {
    const [card, setCard] = useState(null);
    const [outOfCards, setOutOfCards] = useState(false);
    const [activeTimer, setActiveTimer] = useState(false);
    const timerId = useRef();


    const startTimer = () => {
        setActiveTimer(true);
        timerId.current = setInterval(() => {
            getCard();
        }, 1000)
    }

    const stopTimer = () => {
        setActiveTimer(false);
        clearInterval(timerId.current);
        timerId.current = 0;
    }

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
                stopTimer();
                setActiveTimer(false);
                setOutOfCards(true);
                setCard(null);
            }
        }
    }, [card])
    
    return (
        <div>
            <button onClick={activeTimer ? stopTimer : startTimer}>{
                activeTimer ? "Stop timer" : "Start timer"}</button>
            <img src={card ? card.data.cards[0].image : ""} alt=""/>
            <p>{outOfCards ? "End of the deck" : ""}</p>
        </div>
    );

}

export default Cards;