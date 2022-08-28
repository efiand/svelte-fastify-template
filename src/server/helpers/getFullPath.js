import { CWD } from '../constants.js';
import { resolve } from 'path';

export default (path) => resolve(CWD, path).replace(/\\+/gu, '/');
