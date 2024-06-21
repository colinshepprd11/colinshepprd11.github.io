import styled from "styled-components";

export const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImprovContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GameItemContainer = styled.div`
  display: flex;
  padding: 1em;
  border-top-style: solid;
  justify-content: center;
`;

export const NumberContainer = styled.span`
  padding: 0em 0.3em;
`;

export const FlashCardOptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FlashCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FlashDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95vw
`;


export const FlashCardItemContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 2em;
  margin: 1em;
  width: 20em; /* Make sure cards have a consistent width */
  word-break: break-word; /* Ensures words break and wrap */
  text-align: center; /* Center the text within the card */
`;

export const CardContainer = styled.div`
  display: flex;
  padding: 1em;
  flex-wrap: wrap;
  border-top-style: solid;
  justify-content: center;
`;

export const Button = styled.span<{
  width?: string;
  marginTop?: string;
  marginSide?: string;
}>`
  width: ${(props) => (props.width ? props.width : "7em")};
  color: black;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin: ${(props) => (props.marginTop ? props.marginTop : "1")}em
    ${(props) => (props.marginSide ? props.marginSide : ".5")}em;
  padding: 0.7em;
  background-color: lightgrey;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: grey;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
`;
