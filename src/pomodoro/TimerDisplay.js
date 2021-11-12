import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

const TimerDisplay = ({
  isTimerRunning,
  isSessionActive,
  sessionLabel,
  sessionTime,
  sessionTimeToGo,
}) => {
  return (
    <div className="col">
      {isSessionActive && (
        <h2 data-testid="session-title">{`${sessionLabel} for ${minutesToDuration(
          sessionTime
        )} minutes`}</h2>
      )}
      {isSessionActive && (
        <p className="lead" data-testid="session-sub-title">
          {secondsToDuration(sessionTimeToGo)} remaining
        </p>
      )}
      <h3 className={!isTimerRunning && isSessionActive ? "" : "hide"}>
        PAUSED
      </h3>
    </div>
  );
};

export default TimerDisplay;
