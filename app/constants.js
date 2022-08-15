export const __dirname = process.cwd();

export const ExitCode = {
	ERROR: 1,
	SUCCESS: 0
};

export const HttpMethod = {
	DELETE: 'DELETE',
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT'
};


export const DEFAUT_PORT = 4444;

export const PORT = process.env.PORT || DEFAUT_PORT;

export const NODE_ENV = process.env.NODE_ENV || 'production';

export const isDev = NODE_ENV === 'development';
