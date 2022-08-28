import { isDev } from '../constants.js';

export default (dev = isDev) => (dev ? `?${Date.now()}` : '');
