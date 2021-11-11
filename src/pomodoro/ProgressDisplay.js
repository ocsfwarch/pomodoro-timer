import React, { useState, useEffect } from "react";

const ProgressDisplay = ({ sessionTime, sessionTimeToGo }) => {
  const [width, setWidth] = useState("0%");
  const [now, setNow] = useState(0);

  useEffect(() => {
    const current =
      100 - Math.floor((sessionTimeToGo / (sessionTime * 60)) * 100);
    setWidth(`${current}%`);
    setNow(current);
  }, [sessionTime, sessionTimeToGo]);

  return (
    <div className="col">
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
