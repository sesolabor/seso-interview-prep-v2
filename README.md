# Seso Labor Application

The Seso-app repo supports Seso Labor's web server, client application, and other services.

- [Installation](#installation)
- [Running the app](#running-the-app)
- [Migrations](#migrations)

### Installation

1. Clone the repository:
   ```
   $ git clone git@github.com:sesolabor/onsite-challenge-1b.git
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

### Running the app

1. Start the application:
    ```
    $ npm run dev
    ```
1. Navigate: http://localhost:3000

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
