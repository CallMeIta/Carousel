import React, { useEffect, useRef, useState } from 'react';
import { SliderData1 } from './SliderData1';
import { SliderData2 } from './SliderData2';

const Carousel = ({ data, render }) => {
  const holderRef = useRef();
  const menusRef = useRef();
  const sliderRef = useRef();
  const movingProps = useRef({
    startX: undefined,
    endX: undefined,
    slideIndex: 0,
    moveX: undefined,
    touchMoveX: undefined,
    longTouch: undefined,
    slideWidth: 1200,
    numberSlideItem: null,
    startSlide: false,
  });

  const [, setForceRender] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    movingProps.current.slideIndex = index;
    slideTranslateWhenTouch(
      -movingProps.current.slideIndex * movingProps.current.slideWidth
    );
    setForceRender((prev) => !prev);
  }, [index]);

  useEffect(() => {
    if (sliderRef.current && movingProps.current.numberSlideItem === null) {
      movingProps.current.numberSlideItem = document.querySelectorAll(
        '.slide_menus .menu'
      ).length;
      movingProps.current.slideWidth = sliderRef.current.clientWidth;
      menusRef.current.style.width =
        100000 * movingProps.current.numberSlideItem + 'px';
      window.addEventListener('mouseup', mouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [sliderRef]);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const mouseUpHandle = (e) => {
    const {
      numberSlideItem,
      slideIndex,
      moveX,
      slideWidth,
    } = movingProps.current;

    e.preventDefault();
    var absMove = Math.abs(slideIndex * slideWidth - moveX);
    if (absMove > slideWidth / 3) {
      if (moveX > slideIndex * slideWidth && slideIndex < numberSlideItem - 1) {
        movingProps.current.slideIndex++;
      } else if (moveX < slideIndex * slideWidth && slideIndex > 0) {
        movingProps.current.slideIndex--;
      }
    }
    menusRef.current.classList.add('animation');
    slideTranslateWhenTouch(-movingProps.current.slideIndex * slideWidth);
    setForceRender((prev) => !prev);
  };

  const mouseMoveHandle = (e) => {
    const { slideIndex, slideWidth, startX } = movingProps.current;
    if (movingProps.current.startSlide) {
      movingProps.current.touchMoveX = e.pageX;
      // Calculate distance to translate holder.
      movingProps.current.moveX =
        slideIndex * slideWidth + (startX - movingProps.current.touchMoveX);

      slideTranslateWhenTouch(-movingProps.current.moveX);
    }
  };

  const slideTranslateWhenTouch = (s) => {
    menusRef.current.style.transform = 'translateX(' + s + 'px)';
  };

  const mouseDown = (e) => {
    preventDefault(e);
    movingProps.current.startX = e.nativeEvent.clientX;
    movingProps.current.startSlide = true;
    menusRef.current.classList.remove('animation');
  };

  const mouseUp = (e) => {
    mouseUpHandle(e);
    movingProps.current.startSlide = false;
  };

  // const setIndex = (index) => {
  //   movingProps.current.slideIndex = index;
  //   slideTranslateWhenTouch(
  //     -movingProps.current.slideIndex * movingProps.current.slideWidth
  //   );
  //   setForceRender((prev) => !prev);
  // };

  const touchStart = (e) => {
    movingProps.current.startSlide = true;
    movingProps.current.longTouch = false;
    setTimeout(function () {
      window.slider.longTouch = true;
    }, 250);

    movingProps.current.startX = e.changedTouches[0].pageX;
    menusRef.current.classList.remove('animation');
  };
  const touchMove = (e) => {
    if (movingProps.current.startSlide) {
      const { slideIndex, slideWidth, startX } = movingProps.current;
      movingProps.current.touchMoveX = e.changedTouches[0].pageX;
      movingProps.current.moveX =
        slideIndex * slideWidth + (startX - movingProps.current.touchMoveX);
      slideTranslateWhenTouch(-movingProps.current.moveX);
    }
  };

  const touchEnd = (e) => {
    movingProps.current.startSlide = false;
    mouseUpHandle(e);
  };

  return (
    <div className="container">
      <div ref={sliderRef} id="slider" className="slide-wrap">
        <div
          ref={holderRef}
          id="holder"
          onMouseDown={mouseDown}
          onMouseMove={mouseMoveHandle}
          onMouseUp={mouseUp}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          className="slide_holder"
        >
          <div id="menus" className="slide_menus animation" ref={menusRef}>
            {data.map((record, index) => (
              <div className="menu" key={record.id}>
                {render(record)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dots-list">
        {data.map((record, index) => (
          <div
            key={record.id + 1}
            onClick={() => setIndex(index)}
            className={movingProps.current.slideIndex === index ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
