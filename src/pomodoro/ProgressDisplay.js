import React, { useState, useEffect } from "react";

const ProgressDisplay = ({ sessionTime, sessionTimeToGo }) => {
  const [width, setWidth] = useState("0%");
  const [now, setNow] = useState(0);

  useEffect(() => {
    const current = Number(
      100 - (sessionTimeToGo / (sessionTime * 60)) * 100
    ).toFixed(2);
    setWidth(`${current}%`);
    setNow(Math.floor(current));
  }, [sessionTime, sessionTimeToGo]);

  return (
    <div className={sessionTime ? "col" : "col hide"}>
      <div className="progress" style={{ height: "20px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={now} // TODO: Increase aria-valuenow as elapsed time increases
          style={{ width: width }} // TODO: Increase width % as elapsed time increases
        />
      </div>
    </div>
  );
};

export default ProgressDisplay;
