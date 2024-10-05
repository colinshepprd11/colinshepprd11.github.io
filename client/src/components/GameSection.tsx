import styled from "styled-components";
import Computation from "./games/Computation";
import Improv from "./games/Improv";
import { GameItemContainer } from "./style";
import FlashCard from "./games/FlashCard";

const GameSection = () => {
  return (
    <GameContainer>
      <GameItemContainer>
        <Computation />
      </GameItemContainer>
      <GameItemContainer>
        <FlashCard />
      </GameItemContainer>
      <GameItemContainer>
        <Improv />
      </GameItemContainer>
    </GameContainer>
  );
};

const GameContainer = styled.div<{ isMobile?: boolean }>`
  margin: 5% 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default GameSection;
