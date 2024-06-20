import { useTimer } from "react-timer-hook";

const Timer = ({length, onExpire}: any) => {
  let expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + length);

  const {
    seconds,
    minutes,
  } = useTimer({
    expiryTimestamp,
    onExpire,
  });

  return (
    <div style={{ textAlign: "center" }}>
        <span>{minutes}</span>:
        <span>{seconds}</span>
    </div>
  );
}

export default Timer;