import { HealthHandler } from './handler.js';
import { routes } from './routes.js';

export const health = {
  name: 'health',
  version: '1.0.0',
  register: async (server) => {
    const healthHandler = new HealthHandler();
    server.route(routes(healthHandler));
  },
};