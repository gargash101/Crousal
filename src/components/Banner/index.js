import React, { useEffect, useRef, useState } from "react";
import BannerController from "./BannerController/BannerController";
import BannerBody from "./BannerBody/BannerBody";
import "./Banner.scss";

const CROUSAL_DIRECTION = { Forward: "Forward", Reverse: "Reverse" };

const DEFAULT_CROUSAL_DELAY = 2;

const SLIDES_TO_SHOW = 1;

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
    direction: crousalDirection,
    show: SLIDES_TO_SHOW
  });

  const handleDirectionChange = (event) => {
    setCrousalDirection(event.target.value);
  };

  useEffect(() => {
    getBannerImages().then((bannerImages) => {
      setBannerImages(bannerImages);
    });
  }, []);

  const handleSubmit = (crousalState) => {
    setCrousalState({ ...crousalState, show: SLIDES_TO_SHOW });
  };

  return (
    <React.Fragment>
      <BannerController
        CROUSAL_DELAY_VALUE_ERR={CROUSAL_DELAY_VALUE_ERR}
        DEFAULT_CROUSAL_DELAY={DEFAULT_CROUSAL_DELAY}
        CROUSAL_DIRECTION={CROUSAL_DIRECTION}
        ref={durationRef}
        crousalDirection={crousalDirection}
        handleDirectionChange={handleDirectionChange}
        handleSubmit={handleSubmit}
      ></BannerController>

      <BannerBody
        bannerImages={bannerImages}
        crousalState={crousalState}
      ></BannerBody>
    </React.Fragment>
  );
};

export default Banner;
