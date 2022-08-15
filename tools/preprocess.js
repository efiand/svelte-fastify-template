import { deleteAsync } from 'del';
import imageTask from './tasks/imageTask.js';
import runTask from './lib/runTask.js';
import spriteTask from './tasks/spriteTask.js';

Promise.all([deleteAsync('.app/**/*.{js,log,txt}'), runTask(imageTask), runTask(spriteTask)]);
