import { debug } from "console";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_AWS_URL } from "./Calendar";
import axios from "axios";

const oprtations = [
  {
    symbol: "-",
    operation: (a: any, b: any) => {
      return a - b;
    },
  },
  {
    symbol: "+",
    operation: (a: any, b: any) => {
      return a + b;
    },
  },
  {
    symbol: "/",
    operation: (a: any, b: any) => {
      return a / b;
    },
  },
  {
    symbol: "*",
    operation: (a: any, b: any) => {
      return a * b;
    },
  },
];

const generateOperations = () => {
  const numbers = Array(5)
    .fill(null)
    .map((n) => Math.floor(Math.random() * 100));
  const operators = Array(5)
    .fill(null)
    .map((n) => Math.floor(Math.random() * 4));
  return {
    numbers,
    operators,
  };
};

const InactiveStart = ({ gameInfo, setGameInfo }: any) => {
  return (
    <button
      onClick={() => {
        const { numbers, operators } = generateOperations();
        setGameInfo({
          ...gameInfo,
          startTime: moment(),
          currentStateKey: "ActiveStart",
          numbers,
          operators,
        });
      }}
    >
      Start
    </button>
  );
};

const ActiveStart = ({ gameInfo, setGameInfo }: any) => {
  const { operators, numbers } = gameInfo;
  return (
    <StageContainer>
      <div>
        {numbers.map((n: any, i: any) => {
          return (
            <>{" "}{` ${n} ${
              i < operators.length - 1
                ? `${oprtations[operators[i]].symbol}`
                : ""
            } `}{" "}</>
          );
        })}
      </div>
      <button
        onClick={() =>
          setGameInfo({
            ...gameInfo,
            currentStateKey: "ActiveEnd",
          })
        }
      >
        Done
      </button>
    </StageContainer>
  );
};

const ActiveEnd = ({ gameInfo, setGameInfo }: any) => {
  const handleClick = (correct: number) => {
    const { numbers, operators } = generateOperations();
    setGameInfo({
      ...gameInfo,
      score: {
        correct: gameInfo.score.correct + correct,
        seen: gameInfo.score.seen + 1,
      },
      currentStateKey: gameInfo.score.seen < 4 ? "ActiveStart" : "InactiveEnd",
      numbers,
      operators,
    });
  };

  const { operators, numbers, score: {seen} } = gameInfo;

  const getDisplay = () => {
    let total = numbers[0];
    let display = "";
    for(let i = 1; i < numbers.length; i++){
      display += ` , ${oprtations[operators[i - 1]].operation(total, numbers[i])}`
    }
    return `${seen + 1}) ${display}`
  }

  return (
    <StageContainer>
      <div>
        {getDisplay()}
      </div>
      <div>
        <button onClick={() => handleClick(0)}>Correct</button>
        <button onClick={() => handleClick(1)}>InCorrect</button>
      </div>
    </StageContainer>
  );
};

const InactiveEnd = ({ gameInfo, setGameInfo }: any) => {
  const {correct, seen} = gameInfo.score
  const {startTime} = gameInfo;
  const [duration, setDuration] = useState<any>(null);

  useEffect(() => {
    const endTime = moment();
    const minutes = Math.ceil(moment.duration(endTime.diff(startTime)).asMinutes());
    setDuration(minutes)
    axios.post(`${BASE_AWS_URL}/api/insert`, { computationResults: correct, randomResults:minutes })
  }, [])

  return <div>{`${correct} / ${seen} in ${duration}`}</div>;
};

const gameStates: any = {
  ActiveStart,
  ActiveEnd,
  InactiveStart,
  InactiveEnd,
};

const GameSection = () => {
  const [gameInfo, setGameInfo] = useState({
    startTime: null,
    score: { correct: 0, seen: 0 },
    numbers: [],
    operators: [],
    currentStateKey: "InactiveStart",
  });

  const CurrentGameStateComp = gameStates[gameInfo.currentStateKey];

  return (
    <GameContainer>
      <CurrentGameStateComp gameInfo={gameInfo} setGameInfo={setGameInfo} />
    </GameContainer>
  );
};

const GameContainer = styled.div<{ isMobile?: boolean }>`
  margin: 5% 5%;
  display: flex;
  justify-content: center;
`;

const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default GameSection;
