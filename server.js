//* sumEven.js
import { sumEven } from "./1-Problem-Solving-Clean-Code/sumEven/sumEven.js";

console.log("===== Sum Even Test =====");

const numbers = [1, 2, 3, 4, 5, 6];
const result = sumEven(numbers);

console.log(`The sum of even numbers in [${numbers}] is: ${result}`);

//* calc-switch.js
import { calc } from "./1-Problem-Solving-Clean-Code/calc-switch/calc-switch.js";

console.log("===== Calc Test =====");

console.log(calc('add', 5, 3));
console.log(calc('sub', 5, 3));
console.log(calc('mul', 5, 3));
console.log(calc('div', 6, 3));
console.log(calc('div', 6, 0));
console.log(calc('mod', 6, 3));

//* fibonacci.js
import { fibIterative, fibRecursive, fibRecursiveMemo } from "./1-Problem-Solving-Clean-Code/fibonacci/fibonacci.js";

console.log("===== Fibonacci Test =====");

const n = 10;
console.log(`Iterative fib(${n}):`, fibIterative(n));
console.log(`Recursive fib(${n}):`, fibRecursive(n));
console.log(`Memoized fib(${n}):`, fibRecursiveMemo(n));

//* palindrome.js
import { isPalindrome } from "./1-Problem-Solving-Clean-Code/palindrome/palindrome.js";

console.log("===== Palindrome Test =====");

const testStrings = [
  "A man a plan a canal Panama",
  "Race car",
  "hello",
  "Was it a car or a cat I saw"
];

testStrings.forEach(str => {
  console.log(`"${str}" is palindrome?`, isPalindrome(str));
});

//* Server untuk Hapi.js + PostgreSQL Study Case
import Hapi from "@hapi/hapi";
import dotenv from 'dotenv';
import rateLimit from 'hapi-rate-limit';
dotenv.config();
import { Pool, types } from 'pg';
types.setTypeParser(1082, (val) => val);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

import { ClientError } from "./4-Hapi.js+PostgreSQL-Study-Case/Crud-Logic/exceptions/ClientError.js";
import { health } from "./2-http-api-status-code/hapi-health-route/API/index.js";
import { employees } from "./4-Hapi.js+PostgreSQL-Study-Case/Crud-Logic/api/index.js";

import { EmployeesService } from "./4-Hapi.js+PostgreSQL-Study-Case/Crud-Logic/services/EmployeesService.js";
import { EmployeesValidator } from "./4-Hapi.js+PostgreSQL-Study-Case/Crud-Logic/validators/EmployeesValidator/index.js";

const init = async() => {
    const employeesService = new EmployeesService(pool);

    const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

    await server.register([
    {
      plugin: rateLimit,
      options: {
        userLimit: 100,
        userCache: { expiresIn: 60 * 1000 },
        trustProxy: true
      }
    }
  ]);

   await server.register([
    {
      plugin: health,
    },
    {
      plugin: employees,
      options: {
        service: employeesService,
        validator: EmployeesValidator,
      },
    },
   ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: response.message,
          })
          .code(response.statusCode);
      }

      if (!response.isServer) {return h.continue;}

      console.error(response);
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500);
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
