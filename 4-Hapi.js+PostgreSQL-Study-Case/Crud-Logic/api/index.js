import { EmployeeHandler } from './handler.js';
import { routes } from './routes.js';

export const employees = {
  name: 'employees',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const employeeHandler = new EmployeeHandler(service, validator);
    server.route(routes(employeeHandler));
  },
};