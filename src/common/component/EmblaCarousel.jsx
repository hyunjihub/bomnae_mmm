import '../resource/css/embla.css';

import { NextButton, PrevButton } from './EmblaCarouselButtons';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import dakgalb from '../resource/img/dakgalb.png';
import { mediaByIndex } from './Index';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';

const EmblaCarousel = ({ slides, options = { loop: false } }) => {
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }, (emblaRoot) => emblaRoot.parentElement));

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    autoplay.current.reset();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    autoplay.current.reset();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner" onClick={() => navigate('/search/%EB%8B%AD%EA%B0%88%EB%B9%84')}>
                <img className="embla__slide__img" src={mediaByIndex(index)} alt="slider" />
                <div className="search__txt">
                  <span className="white">춘천</span>
                  <span className="big"> 닭갈비</span>
                  <span className="white big"> 찐</span> 맛집
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};

export default EmblaCarousel;
