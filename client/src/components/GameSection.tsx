import styled from "styled-components";
import Computation from "./games/Computation";


const GameSection = () => {
  return (
    <GameContainer>
      <Computation/>
    </GameContainer>
  );
};

const GameContainer = styled.div<{ isMobile?: boolean }>`
  margin: 5% 5%;
  display: flex;
  justify-content: center;
`;

export default GameSection;
