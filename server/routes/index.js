import adminRoutes from './admin.js';
import authRoutes from './auth.js';
import mainRoutes from './main.js';

export default [...adminRoutes, ...authRoutes, ...mainRoutes];
