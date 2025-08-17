"use client";

import React, { DragEvent, JSX, useState } from "react";
import MainPageLink from "../components/MainPageLink/MainPageLink";

type ICard = {
    id: number;
    order: number;
    text: string;
  }

export default function UlbiTVCards(): JSX.Element {

    const [cardList, setCardList] = useState<ICard[]>([
        {id: 1, order: 1, text: 'Card 1'},
        {id: 2, order: 2, text: 'Card 2'},
        {id: 3, order: 3, text: 'Card 3'},
        {id: 4, order: 4, text: 'Card 4'},
    ]);
    const [currentCard, setCurrentCard] = useState<ICard | null>(null);

    function dragStartHandler(e: DragEvent<HTMLDivElement>, card: ICard) {
        setCurrentCard(card);
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = '#6a7282';
    }

    function dragEndHandler(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = '#6a7282';
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = '#8aadf1';
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, card: ICard) {
        e.preventDefault();
        setCardList(cardList.map(c => {
            if (c.id === card.id && currentCard) {
                return {...c, order: currentCard.order};
            };
            if (currentCard && c.id === currentCard.id) {
                return {...c, order: card.order};
            }
            return c; 
        }))
        e.currentTarget.style.background = '#6a7282';
    }

    const sortCards = (a: ICard, b: ICard) => a.order > b.order ? 1 : -1;

    return (
        <div>
            <MainPageLink />
            <div className='w-[100%] h-[100vh] flex gap-6 items-center justify-center'>
                  <div className='flex gap-6 items-center justify-center'>
                      {cardList.sort(sortCards).map(card => 
                          <div 
                              key={card.id}
                              draggable='true'
                              onDragStart={(e) => dragStartHandler(e, card)}
                              onDragLeave={(e) => dragLeaveHandler(e)}
                              onDragEnd={(e) => dragEndHandler(e)}
                              onDragOver={(e) => dragOverHandler(e)}
                              onDrop={(e) => dropHandler(e, card)}
                              className='w-[200px] h-[300px] rounded-xl border-2 border-[--foreground] flex justify-center items-center m-5 cursor-grab text-xl font-bold bg-gray-500'
                          >
                              {card.text}
                          </div>
                      )}
                  </div>
              </div>
        </div>
    );
}