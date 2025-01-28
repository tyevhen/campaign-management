# Campaign management app

Run `docker compose up -d --build` to launch all services.

Front-end application should be available at `http://localhost:5173`.

# Further improvements
* Improve error handling by implementing error handler on the front-end to capture and distinguish all possible error types, set error states and show error messages to the user.
* Create types for API responses.
* Add pagination logic for campaigns ON both FE and BE.
* Introduce clear separation of concerns on FE for container and presentational components.
* Leverage more of `jotai` capabilities to improve state management.
* Improve prisma setup flow so that seeds are applied outside API execution context using prisma package.json dedicated configuration.
* Use git during the development and split work into atomic logical commits.