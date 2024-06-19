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
  align-items: center;
  justify-content: center;
`;

export const NumberContainer = styled.span`
  padding: 0em 0.3em;
`;

export const Button = styled.span<{ width?: string, marginTop?: string }>`
  width: ${(props) => (props.width ? props.width : "7em")};
  display: flex;
  color: black;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin: ${(props) => (props.marginTop ? props.marginTop : "1")}em 0em;
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
