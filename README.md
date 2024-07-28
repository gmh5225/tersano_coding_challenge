# Tersano Coding Challenge

## Prerequisites

If you wish to run this project locally or develop features in a local development environment you will need a few prerequisities installed in your local environment:

1. Node
2. Yarn
3. PostgresQL Database Server

In addition to having a postgres database server, you will need a database user account with sufficient privileges to migrate the schema on initialization. You will provide this information to the development environment via the suitable database connection string.

## Setup

If you are going to develop or run the project locally for the first time you will need to install the dependancies and migrate the schema for your local database environment.

```bash
## run all below from project root:

# Create an env file to store your db config
# Modify the necessary information to connect to your local db server
echo "DBHOST=localhost
DBPORT=5432
DBNAME=<database>
DBUSER=<username>
DBPASS=<password>" > backend/.env.local
# Install server dependencies
yarn --cwd backend install
# Migrate schema to your database, edit parameters to match your local connection string
psql -h SERVER -p PORT -U USERNAME -a -f backend/migrations/0001_init.sql
# Install client dependencies
yarn --cwd frontend install
```

## Running Locally

If you have followed the prerequisites and setup sections you now have everything you need to run this project locally.

```bash
# Runs the local react development server @ localhost:3000
yarn --cwd frontend start

# Runs the local express development API server @ localhost:3001
yarn --cwd backend start

# Both processes must be running as the react development client calls into the development API server so you may run them in separate tabs or panes per your own preferences.
```

## Challenge Requirements

1. User Authentication:

-   [x] Implement a login page that allows users to authenticate.
-   [x] Users should be able to sign up and log in
-   [x] Securely handle authentication on the backend.

2. Product Management:

-   [x] After successful login, display a list of products.
-   [x] Allow authenticated users to add and delete products.
-   [x] Products should have at least the following attributes: Name, Price, and Description.

3. API Endpoints:

-   [x] Create RESTful APIs to handle the addition and deletion of products.
-   [x] Ensure that only authenticated users can modify products.

4. Frontend-Backend Communication:

-   [x] Use appropriate methods to communicate between the front-end and the back-end.

5. Deployment (Bonus):

-   [ ] Deploy the application on any free hosting service (e.g., Heroku, Vercel).
