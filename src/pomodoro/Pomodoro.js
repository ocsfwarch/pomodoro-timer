import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import BreakControl from "./BreakControl";
import FocusControl from "./FocusControl";
import TimerControl from "./TimerControl";
import TimerDisplay from "./TimerDisplay";
import ProgressDisplay from "./ProgressDisplay";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
        sessionTime: breakDuration,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
      sessionTime: focusDuration,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [sessionStop, setSessionStop] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const MAXFocus = 60;
  const MINFocus = 5;
  const MAXBreak = 15;
  const MINBreak = 1;
  const INTERVAL = 1000;

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? INTERVAL : null
  );

  function stopSession() {
    setIsTimerRunning(() => false);
    setSession(() => null);
    setSessionStop(() => true);
    setIsSessionActive(() => false);
  }
  /**q
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;

      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            setSessionStop(false);
            setIsSessionActive(true);
            return {
              label: "Focusing",
              timeRemaining: +focusDuration * 60,
              sessionTime: +focusDuration,
            };
          }
          return { ...prevStateSession };
        });
      }
      return nextState;
    });
  }

  function updateFocusDuration(val) {
    if (val >= MINFocus && val <= MAXFocus) {
      setFocusDuration(() => val);
    }
  }

  function updateBreakDuration(val) {
    if (val >= MINBreak && val <= MAXBreak) {
      setBreakDuration(() => val);
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusControl
          focusDuration={focusDuration}
          updateFocusDuration={updateFocusDuration}
          isDisabled={isSessionActive}
        />
        <BreakControl
          breakDuration={breakDuration}
          updateBreakDuration={updateBreakDuration}
          isDisabled={isSessionActive}
        />
      </div>
      <div className="row">
        <TimerControl
          playPause={playPause}
          isTimerRunning={isTimerRunning}
          isDisabled={isTimerRunning}
          stopSession={stopSession}
        />
      </div>
      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <TimerDisplay
            isTimerRunning={isTimerRunning}
            isSessionActive={isSessionActive}
            sessionStop={sessionStop}
            sessionLabel={session?.label}
            sessionTime={session?.sessionTime}
            sessionTimeToGo={session?.timeRemaining}
          />
        </div>
        <div className="row mb-2">
          <ProgressDisplay
            sessionTime={session?.sessionTime}
            sessionTimeToGo={session?.timeRemaining}
          />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
