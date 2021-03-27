import React from 'react';
import Carousel from './Carousel';
import { SliderData1 } from './SliderData1';
import { SliderData2 } from './SliderData2';
import './carousel.css';

export default function App() {
  return (
    <>
      <Carousel
        data={SliderData1}
        render={(record) => (
          <img
            src={record.src}
            alt={record.alt}
            id={record.id}
            className={record.className}
          />
        )}
      />
      <Carousel
        data={SliderData2}
        render={(record) => <p id={record.id}>{record.text}</p>}
      />
    </>
  );
}
