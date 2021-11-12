import React, { useState, useEffect } from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

const TimerDisplay = ({
  isTimerRunning,
  isSessionActive,
  sessionStop,
  sessionLabel,
  sessionTime,
  sessionTimeToGo,
}) => {
  const [displayTimeToGo, setDisplayTimeToGo] = useState("00:00");
  const [sessionTitle, setSessionTitle] = useState(
    isTimerRunning && sessionLabel && sessionTime
      ? `${sessionLabel} for ${minutesToDuration(sessionTime)} minutes`
      : "Focusing for 25:00 minutes"
  );

  useEffect(() => {
    if (sessionLabel && sessionTime) {
      setSessionTitle(
        () => `${sessionLabel} for ${minutesToDuration(sessionTime)} minutes`
      );
    }
  }, [isTimerRunning, sessionStop, sessionLabel, sessionTime]);

  useEffect(() => {
    setDisplayTimeToGo(secondsToDuration(sessionTimeToGo));
  }, [sessionTimeToGo]);

  return (
    <div className={sessionLabel ? "col" : "col hide"}>
      {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
      <h2 data-testid={sessionLabel ? "session-title" : ""}>{sessionTitle}</h2>
      {/* TODO: Update message below correctly format the time remaining in the current session */}
      <p className="lead" data-testid={sessionLabel ? "session-sub-title" : ""}>
        {displayTimeToGo} remaining
      </p>
      <h1 className={!isTimerRunning && isSessionActive ? "" : "hide"}>
        PAUSED
      </h1>
    </div>
  );
};

export default TimerDisplay;
