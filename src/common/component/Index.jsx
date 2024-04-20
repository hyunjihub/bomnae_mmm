import sample from '../resource/img/sample.jpg';
import sample2 from '../resource/img/sample2.jpg';
import sample3 from '../resource/img/sample3.jpg';

export const media = [sample, sample2, sample3];
export const mediaByIndex = (index) => media[index % media.length];
