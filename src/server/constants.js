export const CWD = process.cwd();

const DEFAULT_PORT = 1993;
export const { NODE_ENV: mode = 'production', PORT = DEFAULT_PORT } = process.env;
export const isDev = mode === 'development';
