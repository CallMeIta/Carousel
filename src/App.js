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
      >
        {SliderData1.map((record, index) => (
          <div key={record.id}>
            <img
              src={record.src}
              alt={record.alt}
              id={record.id}
              className={record.className}
            />
          </div>
        ))}
      </Carousel>
      <Carousel
        data={SliderData2}
      >
        {SliderData2.map((record, index) => (
          <div key={record.id}>
            <p id={record.id}>{record.text}</p>
          </div>
        ))}
      </Carousel>
    </>
  );
}
