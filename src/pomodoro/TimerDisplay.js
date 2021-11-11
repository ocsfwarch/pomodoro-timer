import React, { useState, useEffect } from "react";
import { minutesToDuration } from "../utils/duration";

const TimerDisplay = ({
  isTimerRunning,
  sessionLabel,
  sessionTime,
  sessionTimeToGo,
}) => {
  const [displayTime, setDisplayTime] = useState("00:00");
  const [displayTimeToGo, setDisplayTimeToGo] = useState("00:00");

  //useEffect(() => {
  //  setDisplayTime(minutesToDuration(sessionTime));
  //}, [sessionTime]);

  //useEffect(() => {
  //  setDisplayTimeToGo(minutesToDuration(sessionTimeToGo / 60));
  //}, [sessionTimeToGo]);

  return (
    <div className={isTimerRunning ? "col" : "col hide"}>
      {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
      <h2 data-testid="session-title">
        {sessionLabel} for {displayTime} minutes
      </h2>
      {/* TODO: Update message below correctly format the time remaining in the current session */}
      <p className="lead" data-testid="session-sub-title">
        {displayTimeToGo} remaining
      </p>
    </div>
  );
};

export default TimerDisplay;
