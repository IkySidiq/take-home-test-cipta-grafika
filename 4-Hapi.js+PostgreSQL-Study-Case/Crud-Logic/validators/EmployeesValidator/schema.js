import Joi from 'joi';

//* Explanation
/*
In backend development, validation ensures that incoming data meets expected rules or formats, 
such as verifying that an email is properly formatted or a date is valid, without altering 
the data itself, while sanitization involves cleaning or modifying input to make it safe and 
consistent, such as trimming whitespace, converting text to lowercase, or escaping special 
characters to prevent security vulnerabilities like SQL injection or XSS.
*/
export const EmployeePayloadSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().email().lowercase().required(),
  position: Joi.string().trim().min(1).required(),
  birthDate: Joi.date().required(),
  address: Joi.string().trim().min(1).required(),
});
