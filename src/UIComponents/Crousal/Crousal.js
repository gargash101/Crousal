import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Crousal.scss";

const CROUSAL_DIRECTION = { Forward: "Forward", Reverse: "Reverse" };

const Crousal = (props) => {
  const crousalChild = useMemo(() => {
    let clonedSlides = [...props.children];
    let lastElements = clonedSlides.slice(-props.show);
    let firstElements = clonedSlides.slice(0, props.show);

    return [...lastElements, ...clonedSlides, ...firstElements];
  }, [props.children, props.show]);

  const crousalRef = useRef();

  const [activeSlide, setActiveSlide] = useState(props.show);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const changeSlide = (newIndex) => {
    if (newIndex < 0) {
      newIndex = crousalChild.length - 1;
    } else if (newIndex >= crousalChild.length) {
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
    if (
      activeSlide >= props.show &&
      activeSlide <= crousalChild.length - 2 * props.show
    ) {
      setTransitionEnabled(true);
    }
  }, [activeSlide, crousalChild.length, props.show]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.direction === CROUSAL_DIRECTION.Forward) {
        changeSlide(activeSlide + 1);
      } else {
        changeSlide(activeSlide - 1);
      }
    }, (+props.delay || 1) * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [props.delay, activeSlide, props.direction]);

  const handleTransitionEnd = () => {
    if (activeSlide === 0) {
      setTransitionEnabled(false);
      setActiveSlide(crousalChild.length - 2 * props.show);
    } else if (activeSlide >= crousalChild.length - props.show) {
      setTransitionEnabled(false);
      setActiveSlide(props.show);
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
        className={
          "crousalItemWrapper" + (transitionEnabled ? "" : " noTransition")
        }
        style={{
          transform: `translateX(-${activeSlide * (100 / props.show)}%)`
        }}
        onTransitionEnd={() => handleTransitionEnd()}
      >
        {crousalChild.map((crouseChild) => {
          return React.cloneElement(crouseChild, {
            width: `calc(100%/${props.show})`
          });
        })}
      </div>
    </div>
  );
};

export default Crousal;
