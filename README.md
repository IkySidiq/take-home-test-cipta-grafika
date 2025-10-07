# Running the Application
To run the Cipta Grafika take-home test, execute the application using 'node server.js' or 'npm run start:dev', as server.js serves as the entry point for the code. To test the HTTP endpoints and verify the status codes, use the following command:
``` json
newman run "Cipta-Grafika.postman_collection.json"
```

# Environment Variables
Create a .env file in the project root to configure your server and PostgreSQL connection. Use the following template:

```
__Server configuration__
HOST=localhost
PORT=3000

__PostgreSQL configuration__
PGUSER=your_database_user
PGHOST=localhost
PGPASSWORD=your_database_password
PGDATABASE=your_database_name
PGPORT=5432

__Optional: full connection string__
DATABASE_URL=postgresql://your_database_user:your_database_password@localhost:5432/your_database_name
```