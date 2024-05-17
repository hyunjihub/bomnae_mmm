import banner from '../resource/img/banner.png';

export const media = [banner];
export const mediaByIndex = (index) => media[index % media.length];
