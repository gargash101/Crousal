import React, { useState } from "react";
import "./BannerController.scss";

const BannerController = React.forwardRef((props, durationRef) => {
  const [showDelayValErr, setDelayValErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !durationRef.current.value ||
      isNaN(durationRef.current.value) ||
      parseInt(durationRef.current.value) <= 0
    ) {
      setDelayValErrMsg(props.CROUSAL_DELAY_VALUE_ERR);
    } else {
      props.handleSubmit &&
        props.handleSubmit({
          delay: +durationRef.current.value,
          direction: props.crousalDirection
        });

      showDelayValErr && setDelayValErrMsg("");
    }
  };

  return (
    <form className="bannerController" onSubmit={handleSubmit}>
      <label htmlFor="bannerTransitionDuration">
        Duration:
        <input
          defaultValue={props.DEFAULT_CROUSAL_DELAY}
          id="bannerTransitionDuration"
          ref={durationRef}
          name="duration"
          className={showDelayValErr ? "errBorder" : ""}
        />
      </label>
      {showDelayValErr ? <div className="err">{showDelayValErr}</div> : null}

      <div className="dirWrapper">
        <div>Direction: </div>
        {Object.keys(props.CROUSAL_DIRECTION).map((dir) => {
          return (
            <label>
              <input
                type="radio"
                value={dir}
                checked={dir === props.crousalDirection}
                onChange={props.handleDirectionChange}
              />
              {dir}
            </label>
          );
        })}
      </div>

      <button type="submit" className="sbmtBtn">
        Submit
      </button>
    </form>
  );
});

export default BannerController;
