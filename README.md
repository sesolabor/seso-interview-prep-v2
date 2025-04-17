# Seso Labor Application

The Seso-app repo supports Seso Labor's web server, client application, and other services.

- [Installation](#installation)
- [Running the app](#running-the-app)
- [Migrations](#migrations)

### Installation

1. Clone the repository:
   ```
   $ git clone git@github.com:sesolabor/seso-interview-prep-v2.git
   ```
1. Ensure using project's Node version:
   ```
   $ nvm use
   ```
1. Confirm you are using the correct Node version:
   ```bash
   $ node -v # You should see `v16.8.0`
   ```
1. Install dependencies:
   ```
   $ npm install
   ```
1. Start database services:
   ```
   $ docker-compose up
   ```
1. **If your first time**, initialize local database:
   ```
   $ npm run db:init
   ```
   Note: if you see 'error : database "seso" does not exist', it may be due
   to an existing Postgres process running on port 5432. To fix this, stop your
   running containers and then see if any processes are listed when
   you run:
   ```
   $ sudo lsof -i :5432
   ```
   If so, remove them (`brew services stop postgresql` or `kill -9 <PID>`) and
   then run the migration again
   ```
   $ npm run db:migration:run
   ```
   If you want to start from scratch, please stop any running containers, and then run the following:
   ```
   $ npm run db:reset:hard
   ```
   Now you can return to the beginning of this step and start over.


### Running the app

1. Start the application:
    ```
    $ npm run dev
    ```
1. Navigate: http://localhost:3000

  You should be able to see the 'login' page, but will not be able to actually create an account.

### Project Structure

The project follows the spirit of [**Domain Driven Design**](https://airbrake.io/blog/software-design/domain-driven-design). Top-level nouns being: Entities, Repositories, and Services.
#### Project Structure

```bash
├── server.ts # Routes and bootup stuff.
│
├── pages # Handlers.
│
├── services # Business logic.
│
├── repositories # Repositories & Entities. Think 'single responsibility'.
│
├── client-state # Redux tooling, sagas, ducks.
│
├── components # React components.
````

#### Migrations

Entities are [**TypeORM Entities**](https://typeorm.io/#/entities). Creating/updating entities, requires migrations! To generate and run migrations, follow these steps:

1. Generating a new entity:

   ```
   $ npm run typeorm -- entity:create -n User

   > seso-app@1.0.0 typeorm /Users/wiski/projects/seso-app
   > ts-node ./node_modules/typeorm/cli --config repositories/ormconfig.ts "entity:create" "-n" "User"

   Entity /Users/wiski/projects/seso-app/repositories/entities/User.ts has been created successfully.
   ```

1. Adding/changing attributes to the entity.
1. Generating a new migration:
   ```
   $ npm run typeorm -- migration:generate -n CreateUser
   ```
1. Running the resulting migration:
   ```
   $ npm run typeorm -- migration:run
   ```
