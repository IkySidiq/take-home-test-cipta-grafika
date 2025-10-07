//* Answer for point A
/*Using SELECT * FROM users can be risky because it retrieves all columns and records
from the users table, potentially exposing sensitive information such as passwords and
email addresses unnecessarily. Additionally, if the table contains a large number of rows,
this query can significantly impact performance and consume excessive memory.
Finally, without proper error handling, a database query failure could cause the server
to crash or return unhandled errors.
*/

//* Answer for point B
/*
Using parameterized queries with placeholders (e.g., $1, $2) helps prevent SQL injection attacks
by ensuring that user input is properly escaped and treated as data rather than executable code.

This implementation also adds pagination support with `page` and `limit` query parameters,
which improves performance by fetching only a subset of users per request instead of all rows
and takes prevention of data scraping.

Selecting only necessary columns (id, name, email) avoids exposing sensitive data such as passwords.

Error handling is included to prevent server crashes if the database query fails,
and a total count of users is returned to help front-end applications calculate the total number of pages.
*/


//* Answer for point A
/* 
Using SELECT * FROM users can be risky because it retrieves all columns and records
from the users table, potentially exposing sensitive information such as passwords and
email addresses unnecessarily. Additionally, if the table contains a large number of rows,
this query can significantly impact performance and consume excessive memory.
Finally, without proper error handling, a database query failure could cause the server
to crash or return unhandled errors.
*/

//* Answer for point B
/*
Using parameterized queries with placeholders (e.g., $1, $2) helps prevent SQL injection attacks
by ensuring that user input is properly escaped and treated as data rather than executable code.

This implementation also adds pagination support with `page` and `limit` query parameters,
which improves performance by fetching only a subset of users per request instead of all rows
and helps prevent excessive data exposure or scraping.

Selecting only necessary columns (id, name, email) avoids exposing sensitive data such as passwords.

Error handling is included to prevent server crashes if the database query fails,
and a total count of users is returned to help front-end applications calculate the total number of pages.
*/

const getData = async (req, h) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const offset = (page - 1) * limit;

  try {
    const query = {
      text: 'SELECT id, name, email FROM users ORDER BY id LIMIT $1 OFFSET $2',
      values: [limit, offset],
    };

    const result = await client.query(query);
    const countResult = await client.query('SELECT COUNT(*) FROM users');
    const total = parseInt(countResult.rows[0].count, 10);

    return h.response({
      page,
      limit,
      total,
      data: result.rows,
    }).code(200);

  } catch (err) {
    // This error will bubble up to the centralized onPreResponse handler in server.js.
    // There, the handler can inspect the error instance to determine its type.
    throw err;
  }
};

