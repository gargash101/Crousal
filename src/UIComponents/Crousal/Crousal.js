import { useEffect, useMemo, useRef, useState } from "react";
import "./Crousal.scss";

const Crousal = (props) => {
  const crousalChild = useMemo(() => {
    let clonedSlides = [...props.children];
    let firstChild = clonedSlides[0];
    let lastChild = clonedSlides[clonedSlides.length - 1];

    return [lastChild, ...clonedSlides, firstChild];
  }, [props.children]);

  const crousalItemCount = crousalChild && crousalChild.length;
  const crousalRef = useRef();

  const [activeSlide, setActiveSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const changeSlide = (newIndex) => {
    if (newIndex < 0) {
      newIndex = crousalItemCount - 1;
    } else if (newIndex >= crousalItemCount) {
      newIndex = 0;
    }

    setActiveSlide(newIndex);
  };

  useEffect(() => {
    let lazyImageEls = crousalRef.current.querySelectorAll("img.lazy");
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImageEls &&
      lazyImageEls.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
  }, []);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   changeSlide(activeSlide + 1);
    // }, (+props.delay || 1) * 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [props.delay, activeSlide]);

  const handleTransitionEnd = () => {
    if (activeSlide === 0) {
      setTransitionEnabled(false);
      setActiveSlide(props.children.length - 1);
    } else if (activeSlide > props.children.length - 1) {
      setTransitionEnabled(false);
      setActiveSlide(1);
    }
  };

  return (
    <div className="crousal" ref={crousalRef}>
      <div className="crousController">
        <div
          className="arrow left"
          onClick={() => {
            changeSlide(activeSlide - 1);
          }}
        ></div>
        <div
          className="arrow right"
          onClick={() => {
            changeSlide(activeSlide + 1);
          }}
        ></div>
      </div>
      <div
        className="crousalItemWrapper"
        style={{
          transform: `translateX(-${activeSlide * 100}%)`,
          ...(!transitionEnabled && { tranisition: "none !imporant" })
        }}
        onTransitionEnd={() => handleTransitionEnd()}
      >
        {crousalChild}
      </div>
    </div>
  );
};

export default Crousal;
