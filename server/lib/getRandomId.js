import getRandomInt from './getRandomInt.js';

// Для генерации уникального id отнимаем от текущей даты рандомное число от нуля до этой величины
const MAX_RANDOM = 10000;

export default (maxDiff = MAX_RANDOM) => Date.now() - getRandomInt(0, maxDiff);
