import '../resource/css/embla.css';

import { NextButton, PrevButton } from './EmblaCarouselButtons';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Autoplay from 'embla-carousel-autoplay';
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
              <div className="embla__slide__inner">
                <img className="embla__slide__img" src={mediaByIndex(index)} alt="slider" />
                <span className="search__txt">
                  춘천의 찐<br />
                  닭갈비 맛집은
                </span>
                <button className="search__button" onClick={() => navigate('/search/%EB%8B%AD%EA%B0%88%EB%B9%84')}>
                  여기서 확인!
                </button>
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
