import banner from '../resource/img/banner.png';
import carousel from '../resource/img/carousel.png';

export const media = [banner];
export const mediaByIndex = (index) => media[index % media.length];
