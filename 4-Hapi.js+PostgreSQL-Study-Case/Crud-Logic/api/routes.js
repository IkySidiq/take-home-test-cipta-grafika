export const routes = (handler) => [
  {
    method: 'POST',
    path: '/employees',
    handler: handler.addEmployeeHandler,
  },
]