import carousel from '../resource/img/carousel.png';

export const media = [carousel, carousel, carousel];
export const mediaByIndex = (index) => media[index % media.length];
