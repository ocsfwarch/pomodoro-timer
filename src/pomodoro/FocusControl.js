import React from "react";
import { minutesToDuration } from "../utils/duration";

const FocusControl = ({ focusDuration, updateFocusDuration, isDisabled }) => {
  const display = minutesToDuration(focusDuration);
  const handleDurationEvent = (strType) => {
    if (strType === "increase") {
      updateFocusDuration((focusDuration += 5));
    } else {
      updateFocusDuration((focusDuration -= 5));
    }
  };
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          Focus Duration: {display}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={() => handleDurationEvent("decrease")}
            disabled={isDisabled}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={() => handleDurationEvent("increase")}
            disabled={isDisabled}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusControl;
