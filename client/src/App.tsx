import Calendar from "./components/Calendar";
import GameSection from "./components/GameSection";
import styled from "styled-components";

function App() {
  const isMobile = window.innerWidth <= 530;
  return (
    <AppContainer isMobile={isMobile}>
      <AppFlexContainer>
        <Calendar />
        <GameSection />
      </AppFlexContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div<{ isMobile?: boolean }>`
  margin: ${(props) => (props.isMobile ? "10% 10%" : "5% 5%")};
  display: flex;
  justify-content: center;
`;

const AppFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
