import "./Banner.scss";

import { Crousal, CrousalItem } from "../../UIComponents/Crousal";
import React, { useEffect, useRef, useState } from "react";

const CROUSAL_DIRECTION = { Forward: "Forward", Reverse: "Reverse" };

const DEFAULT_CROUSAL_DELAY = 2;

const CROUSAL_DELAY_VALUE_ERR =
  "Please enter a value greater than or equal to 1";

async function getBannerImages(index) {
  try {
    let resp = await fetch("https://demo5110359.mockable.io/images");
    let bannerImages = await resp.json();

    return bannerImages.images;
  } catch (e) {
    console.log(e);
    return [];
  }
}

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([]);

  const [crousalDirection, setCrousalDirection] = useState(
    CROUSAL_DIRECTION.Forward
  );
  const durationRef = useRef();

  const [crousalState, setCrousalState] = useState({
    delay: DEFAULT_CROUSAL_DELAY,
    direction: crousalDirection
  });

  const [showDelayValErr, setDelayValErrMsg] = useState("");

  const handleDirectionChange = (event) => {
    setCrousalDirection(event.target.value);
  };

  useEffect(() => {
    getBannerImages().then((bannerImages) => {
      setBannerImages(bannerImages);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isNaN(durationRef.current.value) ||
      parseInt(durationRef.current.value) <= 0
    ) {
      setDelayValErrMsg(CROUSAL_DELAY_VALUE_ERR);
    } else {
      setCrousalState({
        delay: +durationRef.current.value,
        direction: crousalDirection
      });

      showDelayValErr && setDelayValErrMsg("");
    }
  };

  return (
    <React.Fragment>
      <form className="bannerController" onSubmit={handleSubmit}>
        <label htmlFor="bannerTransitionDuration">
          Duration:
          <input
            defaultValue={DEFAULT_CROUSAL_DELAY}
            id="bannerTransitionDuration"
            ref={durationRef}
            name="duration"
            className={showDelayValErr ? "errBorder" : ""}
          />
        </label>
        {showDelayValErr ? <div className="err">{showDelayValErr}</div> : null}

        <div className="dirWrapper">
          <div>Direction: </div>
          {Object.keys(CROUSAL_DIRECTION).map((dir) => {
            return (
              <label>
                <input
                  type="radio"
                  value={dir}
                  checked={dir === crousalDirection}
                  onChange={handleDirectionChange}
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
      {bannerImages.length > 0 ? (
        <div className="banner">
          <Crousal {...crousalState}>
            {bannerImages.map((imgSrc, index) => {
              return (
                <CrousalItem className="crouseItem">
                  <div className="crouseItemCount">Image:{index + 1}</div>
                  <img
                    className="bannerImg lazy"
                    data-src={imgSrc}
                    alt={"bannerImg" + (index + 1)}
                  />
                </CrousalItem>
              );
            })}
          </Crousal>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Banner;
