import { useRef, useState } from "react";
import { Button, ImprovContainer, StageContainer } from "../style";
import { generate } from "random-words";
import Timer from "./Timer";

const Improv = () => {
  const [word, setWord] = useState<any>("");
  const [activeImprov, setActiveImprov] = useState(false);
  const StartImprov = () => {
    const word = generate({ minLength: 5, maxLength: 20 });
    setWord(word);
    setActiveImprov(true);
  };

  const audioPlayer = useRef<any>(null);

  function playAudio() {
    if (audioPlayer?.current?.play) audioPlayer.current.play();
  }

  return (
    <ImprovContainer>
      {activeImprov && (
        <StageContainer>
          <StageContainer> {word} </StageContainer>
          <Timer length={120} playAudio={playAudio} />
        </StageContainer>
      )}
      {!activeImprov && (
        <StageContainer>
          {" "}
          <Button marginTop={"1"} onClick={StartImprov}>Start Improv</Button>
          <Button marginTop={"1"} onClick={playAudio}>Test Audio</Button>
        </StageContainer>
      )}
      <audio
        ref={audioPlayer}
        src={"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"}
      />
    </ImprovContainer>
  );
};

export default Improv;
