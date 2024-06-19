import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_AWS_URL } from "../Calendar";
import { Button, NumberContainer, StageContainer } from "../style";

const decimals = (n: number) => {
  return !n || n % 1 === 0 ?
    n : 
    Number(n.toFixed(2))
}

const oprtations = [
  {
    symbol: "-",
    operation: (a: any, b: any) => {
      return decimals(a - b);
    },
  },
  {
    symbol: "+",
    operation: (a: any, b: any) => {
      return decimals(a + b);
    },
  },
  {
    symbol: "/",
    operation: (a: any, b: any) => {
      return decimals(a / b);
    },
  },
  {
    symbol: "*",
    operation: (a: any, b: any) => {
      return decimals(a * b);
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
    <Button
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
      Start Computation
    </Button>
  );
};

const ActiveStart = ({ gameInfo, setGameInfo }: any) => {
  const { operators, numbers, score: { seen } } = gameInfo;
  return (
    <StageContainer>
      <div>
        {`${seen + 1})`}
        {numbers.map((n: any, i: any) => {
          return (
            <span key={i}>
              <NumberContainer>{n}</NumberContainer>
              {i < operators.length - 1 ? (
                <NumberContainer >
                  {oprtations[operators[i]].symbol}
                </NumberContainer>
              ) : (
                ""
              )}
            </span>
          );
        })}
      </div>
      <Button
        onClick={() =>
          setGameInfo({
            ...gameInfo,
            currentStateKey: "ActiveEnd",
          })
        }
      >
        Done
      </Button>
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

  const {
    operators,
    numbers,
    score: { seen },
  } = gameInfo;

  const getDisplay = () => {
    let total = numbers[0];
    let display = "";
    for (let i = 1; i < numbers.length; i++) {
      total = oprtations[operators[i - 1]].operation(
        total,
        numbers[i]
      )
      display += `${i > 1 ? "," : ""} ${total}`;
    }
    return `${seen + 1}) ${display}`;
  };

  return (
    <StageContainer>
      <div>{getDisplay()}</div>
      <div>
        <Button onClick={() => handleClick(0)}>Correct</Button>
        <Button onClick={() => handleClick(1)}>InCorrect</Button>
      </div>
    </StageContainer>
  );
};

const InactiveEnd = ({ gameInfo, setGameInfo }: any) => {
  const { correct, seen } = gameInfo.score;
  const { startTime } = gameInfo;
  const [duration, setDuration] = useState<any>(null);

  useEffect(() => {
    const endTime = moment();
    const minutes = Math.ceil(
      moment.duration(endTime.diff(startTime)).asMinutes()
    );
    setDuration(minutes);
    axios.post(`${BASE_AWS_URL}/api/insert`, {
      randomResults: minutes,
    });
  }, []);

  return <div>{`${correct} / ${seen} in ${duration}`}</div>;
};

const gameStates: any = {
  ActiveStart,
  ActiveEnd,
  InactiveStart,
  InactiveEnd,
};

const Computation = () => {
  const [gameInfo, setGameInfo] = useState({
    startTime: null,
    score: { correct: 0, seen: 0 },
    numbers: [],
    operators: [],
    currentStateKey: "InactiveStart",
  });
  const CurrentGameStateComp = gameStates[gameInfo.currentStateKey];
  return <CurrentGameStateComp gameInfo={gameInfo} setGameInfo={setGameInfo} />;
};



export default Computation;
