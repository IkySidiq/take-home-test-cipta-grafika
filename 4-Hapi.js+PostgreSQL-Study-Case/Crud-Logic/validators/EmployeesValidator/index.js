import { EmployeePayloadSchema } from './schema.js';
import { InvariantError } from '../../exceptions/InvariantError.js';

export const EmployeesValidator = {
  validateEmployeePayload: (payload) => {
    const validationResult = EmployeePayloadSchema.validate(payload);

    if (validationResult.error) {
      console.log('Error validating employee payload');
      throw new InvariantError(validationResult.error.message);
    }
  },
};
