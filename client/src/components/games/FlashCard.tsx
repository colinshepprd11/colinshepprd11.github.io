import { useEffect, useState } from "react";
import {
  Button,
  FlashCardContainer,
  FlashCardItemContainer,
  FlashCardOptionContainer,
  FlashDisplayContainer,
} from "../style";
import FlashCardData from "./FlashCardData";
import styled from "styled-components";

const CardDisplay = ({ cards, topic }: any) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [side, setSide] = useState("front");

  const changeCard = (direction: number) => {
    let nextCard = currentCard + direction;
    if (nextCard < 0) nextCard = cards.length - 1;
    if (nextCard > cards.length - 1) nextCard = 0;
    setCurrentCard(nextCard);
    setSide("front");
  };

  const handleClick = () => {
    setSide((s) => (s === "front" ? "back" : "front"));
  };

  return (
    <FlashDisplayContainer>
      <LeftArrow onClick={() => changeCard(-1)} />
      <FlashCardItemContainer onClick={handleClick}>
        {cards[currentCard][side]}
      </FlashCardItemContainer>
      <RightArrow onClick={() => changeCard(1)} />
    </FlashDisplayContainer>
  );
};

const FlashCard = () => {
  const [activeTopic, setActiveTopic] = useState<any>({ topic: "", cards: [] });
  const { topic, cards } = activeTopic;
  return (
    <FlashCardContainer>
      {cards.length > 0 && <CardDisplay key={topic} cards={cards} />}
      <FlashCardOptionContainer>
        {FlashCardData.map((data) => {
          const { topic, cards } = data;
          return (
            <Button
              key={topic}
              onClick={() => setActiveTopic({ topic, cards })}
            >
              {topic}
            </Button>
          );
        })}
      </FlashCardOptionContainer>
    </FlashCardContainer>
  );
};

// Common style for both arrows
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  cursor: pointer;
`;

const LeftArrow = styled(Arrow)`
  border-width: 10px 15px 10px 0;
  border-color: transparent black transparent transparent;
`;

const RightArrow = styled(Arrow)`
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent black;
`;

export default FlashCard;
