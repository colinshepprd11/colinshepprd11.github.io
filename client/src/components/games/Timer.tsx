import { useTimer } from "react-timer-hook";

const Timer = ({length, playAudio}: any) => {
  let expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + length); // 10 minutes timer

  const {
    seconds,
    minutes,
  } = useTimer({
    expiryTimestamp,
    onExpire: playAudio,
  });

  return (
    <div style={{ textAlign: "center" }}>
        <span>{minutes}</span>:
        <span>{seconds}</span>
    </div>
  );
}

export default Timer;