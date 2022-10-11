<!-- Project Summary -->

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/tractian-challenge/tree/main/server">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="Logo" width="90">
  </a>

  <h3 align="center">Tractian Challenge POC</h3>
  <div align="center">
    Full Stack Development Project 
    <br />
    <a href="https://github.com/NivaldoFarias/tractian-challenge/tree/main/server"><strong>Browse Back End code»</strong></a>
    -
    <a href="https://github.com/NivaldoFarias/tractian-challenge/tree/main/client"><strong>Browse Front End code»</strong></a>
  </div>
</div>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/tractian-challenge/tree/main/server/releases/tag/v2.0.0" alt="Current template version badge">
    <img src="https://img.shields.io/badge/license-MIT-%23A8D1FF?style=flat-square" />
  </a>
</div>

<!-- Table of Contents -->

# Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Error Handling and Logging](#error-handling-and-logging)
  - [AppError](#--apperror)
  - [AppLog](#--applog)
- [Middlewares](#middlewares)
- [API Reference](#api-reference)
  - [Models](#models)
  - [Routes](#routes)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Companies](#companies)
  - [Units](#units)
  - [Assets](#assets)

<!-- Installation and Usage -->

## Installation and Usage

###### Pre-requisites: Node.js `^16.14.0`, TypeScript `^4.7.4`

Download the zip file and extract it in the root of a new project folder by running these commands:

```bash
wget https://github.com/NivaldoFarias/tractian-challenge/archive/main.zip
```

Then run the following command to install the project's dependencies:

```bash
npm install
```

That's it! You can now start developing your TypeScript Project by running the command below. Happy coding!

```bash
npm run dev
```

<!-- Error Handling and Logging -->

## Error Handling and Logging

While dealing with errors in a _Layered Structure_ Project enviroment, you may notice that the project's debugging complexity scales beyond common `console.log()` usage. The `AppLog` Object and `AppError` Object structures were set to counter that exact issue, by trying to keep the Development process as clean and concise as possible. Both are frequently referenced in the code, but do have a specific usage.

#### ▸ &nbsp; AppError

An `AppError` Object is used to handle errors in the application. It that takes four parameters:

- `log`: A string containing a simplified error message, for _Server side_ use. **This is the message that will be used by the `AppLog` Object**
- `statusCode`: An integer containing the HTTP status code.
- `message`: A string containing a simplified error message, for _Client side_ use. **This is the message that will be displayed to the user.**
- `details`: A string containing a detailed error message, for _Client side_ use. Can be used to provide more information about the error, such as the stack trace, or suggestions on how to counter the error.

##### Example Usage

```typescript
  // ..../middlewares/auth.middleware.ts

  import * as repository from './../repositories/auth.repository.ts';
  import AppError from './../events/AppError';
  ...
  ..

  async function usersExists(req: Request,...){
    ...
    ..
    const user = await repository.findbyId(req.body.id);

    if (!user){
      throw new AppError(
        'User not found',
        404,
        'User not found',
        'Ensure to provide a valid user ID.'
      );
    }
    ..
    ...
  }
```

#### ▸ &nbsp; AppLog

An `AppLog` Object is used to handle logs in the application. It takes two parameters:

- `type`: A string containing the main _Layer Structure_ that contains the log. There are seven allowed values: `Error`, `Server`, `Controller`, `Middleware`, `Repository`, `Service`, and `Util`.
- `text`: A descriptive string containing the log message. Generally, a short message that describes the output event of the function that generated the log.

##### Example Usage

```typescript
  // ..../middlewares/auth.middleware.ts

  import AppLog from './events/AppLog';
  ...
  ..

  async function usersExists(req: Request,...){
    ...
    ..

    // output: [Middleware] User Found
    AppLog('Middleware', 'User found');
    res.locals.user = user;
    return next();
  }
  ..
  ...
```

<!-- Middlewares -->

## Middlewares

While aiming to provide a reusable, modular and extensible architecture, the middlewares are generally the first structures to be refactored into self-contained modules. The `validateSchema()`, `processHeader()` and `requireToken()` middlewares were set in order to achieve that goal. The following section describes **`useMiddleware()`**, which incorporates the forementioned functions as _key–value_ pairs in an Object, along with their structure and usage.

### ‣ &nbsp;UseMiddleware

The `useMiddleware()` function takes two parameters:

- `middlewares`: An Object containing the _key–value_ pairs of the middlewares to be used, takes one to three parameters:
  - `schema`: A [Joi](https://joi.dev/api/) Schema Object that will be used to validate the data provided by the client. If the data provided by the client is not valid, an **`AppError`** Object will be thrown.
  - `header`: A string containing the name of the header that will be used to authenticate the action. If the client-provided header is missing, an **`AppError`** Object will be thrown.
  - `token`: A boolean indicating whether the token provided by the client will be verified or not. If the token is not valid, an **`AppError`** Object will be thrown.
- `endpoint`: A string that will be used to identify the endpoint at which the _client–api_ interaction is undergoing, which will be logged to console by the **`AppLog`** Object.

###### Reference: [useMiddleware function declaration](https://github.com/NivaldoFarias/typescript-project-template/blob/main/src/utils/middleware.util.ts)

##### Example Usage

```typescript
// ..../routes/admin.route.ts
import useMiddleware from '../utils/middleware.util';
import * as schema from '../models/admin.model';
...
..
const endpoint = '/admin';

const registerEndpoint = '/create';
adminRouter.post(endpoint,
  createEndpoint,
  useMiddleware({
    schema: schema.create,
    header: 'admin-api-key',
    token: true
  },
  endpoint + createEndpoint),
  middleware.createValidations,
  controller.create,
);
..
...
```

# API Reference

In this section, you will find the example API's endpoints and their respective descriptions, along with the request and response examples, as well as the [MongoDB](https://www.mongodb.com/) **_BSON_** types for each entity, that can be used as guide for data formatting. All data is sent and received as **_JSON_**.

<!-- Models -->

## Models

### User model _`User`_

- `_id`: A unique identifier for each user. `ObjectId`
- `full_name`: The user's full name. `String` `required` `max(100)`
- `username`: The user's username. `String` `required` `unique` `max(25)`
- `password`: The user's password. `String` `required` `max(50)`
- `last_update`: The date and time when the user was last updated. `Date`
- `created_at`: The date and time when the user was created. `Date`

### Company model _`Company`_

- `_id`: A unique identifier for each company. `ObjectId`
- `name`: The companys's name. `String` `required` `unique` `max(100)`
- `units`: An array containing the company's units. `Unit[]`
- `users`: An array containing the company's users. `User[]`
- `x-api-key`: The company's API key. `String` `required`
- `last_update`: The date and time when the company was last updated. `Date`
- `created_at`: The date and time when the company was created. `Date`

### Unit model _`Unit`_

- `_id`: A unique identifier for each unit. `ObjectId`
- `name`: The units's name. `String` `required` `unique` `max(50)`
- `street`: The unit's street. `String` `max(100)`
- `number`: The unit's number. `String` `max(10)`
- `city`: The unit's city. `String` `required` `max(50)`
- `state`: The unit's state. `String` `required` `max(50)`
- `postal_code`: The unit's postal code. `String` `max(20)`
- `assets`: An array containing the unit's assets. `Asset[]`
- `opens_at`: The date and time when the unit opens. `String` `required` `length(5)`
- `closes_at`: The date and time when the unit closes. `String` `required` `length(5)`
- `last_update`: The date and time when the unit was last updated. `Date`
- `created_at`: The date and time when the unit was created. `Date`

### Asset model _`Asset`_

- `_id`: A unique identifier for each asset. `ObjectId`
- `name`: The assets's name. `String` `required` `max(50)`
- `description`: The assets's description. `String`
- `model`: The assets's model. `String` `required` `max(100)`
- `owner`: The assets owner's user. `User` `required`
- `image`: The assets's image URL. `String`
- `status`: The assets's status. `String` `required` `enum('RUNNING', 'ALERTING', 'STOPPED')`
- `health`: The assets's healthscore. `Number` `required` `min(0)` `max(100)`
- `last_update`: The date and time when the asset was last updated. `Date`
- `created_at`: The date and time when the asset was created. `Date`

## Routes

### [Authentication](#authentication) _`/auth`_

- [Sign In](#---sign-in)
- [Sign Out](#---sign-out) `token`

### [Users](#users) _`/users`_

- [Create](#---create-an-user) `x-api-key`
- [Search All Users](#---search-all-users) `token`
- [Search by Id](#---search-user-by-id) `token`
- [Update](#---update-an-user) `token` `x-api-key`
- [Delete](#---delete-an-user) `token` `x-api-key`

### [Companies](#companies) _`/companies`_

- [Create](#---create-a-company) `x-api-key`
- [Search All Companies](#---search-all-companies) `token`
- [Search by Id](#---search-companies-by-id) `token`
- [Update](#---update-a-company) `token` `x-api-key`
- [Delete](#---delete-a-company) `token` `x-api-key`

### [Units](#units) _`/units`_

- [Create](#---create-an-unit) `token` `x-api-key`
- [Search All Units](#---search-all-units) `token`
- [Search by Id](#---search-unit-by-id) `token`
- [Update](#---update-an-unit) `token` `x-api-key`
- [Delete](#---delete-an-unit) `token` `x-api-key`

### [Assets](#assets) _`/assets`_

- [Create](#---create-an-asset) `token` `x-api-key`
- [Search All Assets](#---search-all-assets) `token`
- [Search by Id](#---search-asset-by-id) `token`
- [Update](#---update-an-asset) `token` `x-api-key`
- [Delete](#---delete-an-asset) `token` `x-api-key`

## Authentication

### &nbsp; ‣ &nbsp; Sign in

###### &nbsp; &nbsp; POST _`/auth/sign-in`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "username": "JohnDoe",
  "password": "123456789"
}
```

##### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description       |          Properties          |
| :---------: | :---------------------: | :--------------------------: |
|   **200**   |           OK            |      `data: { token }`       |
|   **400**   |     Invalid Syntax      | `error: { message, detail }` |
|   **404**   |     User not Found      | `error: { message, detail }` |
|   **409**   | User has Active Session | `error: { message, detail }` |
|   **422**   |  Invalid Request Input  | `error: { message, detail }` |
|   **500**   |  Internal Server Error  | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Sign out

###### &nbsp; &nbsp; POST _`/auth/sign-out`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "token": "server-generated-token"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **404**   |   Session not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Users

### &nbsp; ‣ &nbsp; Create an User

###### &nbsp; &nbsp; POST _`/users/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "full_name": "John Doe Junior the Third",
  "username": "JohnDoe",
  "password": "123456789",
  "company": "5f9f1b9f9d1b9d1b9f1b9d1b"
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |         Description         |          Properties          |
| :---------: | :-------------------------: | :--------------------------: |
|   **201**   |           Created           |         `data: null`         |
|   **400**   |       Invalid Syntax        | `error: { message, detail }` |
|   **403**   |     Forbidden x-api-key     | `error: { message, detail }` |
|   **409**   | Username Already Registered | `error: { message, detail }` |
|   **422**   |    Invalid Request Input    | `error: { message, detail }` |
|   **500**   |    Internal Server Error    | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Users

###### &nbsp; &nbsp; GET _`/users/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |    10     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |  `data: { User[] \| null}`   |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Session not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search User by id

###### &nbsp; &nbsp; GET _`/users/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: User`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    User not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Update an User

###### &nbsp; &nbsp; PUT _`/users/:id/update`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "full_name": "John Doe Junior the Second",
  "username": "JohnDoe"
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    User not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Delete an User

###### &nbsp; &nbsp; DELETE _`/users/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>".
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    User not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Companies

### &nbsp; ‣ &nbsp; Create a Company

###### &nbsp; &nbsp; POST _`/companies/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Acme Inc."
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |        Description         |          Properties          |
| :---------: | :------------------------: | :--------------------------: |
|   **201**   |          Created           |         `data: null`         |
|   **400**   |       Invalid Syntax       | `error: { message, detail }` |
|   **401**   |     Missing x-api-key      | `error: { message, detail }` |
|   **403**   |    Forbidden x-api-key     | `error: { message, detail }` |
|   **409**   | Company Already Registered | `error: { message, detail }` |
|   **422**   |   Invalid Request Input    | `error: { message, detail }` |
|   **500**   |   Internal Server Error    | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Companies

###### &nbsp; &nbsp; GET _`/companies/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |     5     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           | `data: { Company[] \| null}` |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Session not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search Company by id

###### &nbsp; &nbsp; GET _`/companies/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |       `data: Company`        |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Company not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Update a Company

###### &nbsp; &nbsp; PUT _`/companies/:id/update`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Acme Inc. 2"
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Company not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Delete a Company

###### &nbsp; &nbsp; DELETE _`/companies/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Company not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Units

### &nbsp; ‣ &nbsp; Create an Unit

###### &nbsp; &nbsp; POST _`/units/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Acme Inc. - Unit 1",
  "description": "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  "city": "New York",
  "state": "NY",
  "opens_at": "08:00",
  "closes_at": "18:00",
  "company": "5f9f1b9f9d1b9d1b9f1b9d1b"
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description       |          Properties          |
| :---------: | :---------------------: | :--------------------------: |
|   **201**   |         Created         |         `data: null`         |
|   **400**   |     Invalid Syntax      | `error: { message, detail }` |
|   **401**   |      Missing Token      | `error: { message, detail }` |
|   **403**   |     Forbidden Token     | `error: { message, detail }` |
|   **409**   | Unit Already Registered | `error: { message, detail }` |
|   **422**   |  Invalid Request Input  | `error: { message, detail }` |
|   **500**   |  Internal Server Error  | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Units

###### &nbsp; &nbsp; GET _`/units/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |     5     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |  `data: { Unit[] \| null}`   |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Session not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search Unit by id

###### &nbsp; &nbsp; GET _`/units/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: Unit`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Unit not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Update an Unit

###### &nbsp; &nbsp; PUT _`/units/:id/update`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Acme Inc. - Unit 1",
  "description": "Now at a new location!",
  "address": "Main Street",
  "number": "123",
  "city": "New York",
  "state": "NY",
  "postal_code": "12345",
  "opens_at": "08:00",
  "closes_at": "18:00"
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Unit not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Delete an Unit

###### &nbsp; &nbsp; DELETE _`/units/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Unit not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Assets

### &nbsp; ‣ &nbsp; Create an Asset

###### &nbsp; &nbsp; POST _`/assets/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Assembly Machine",
  "description": "This is a machine for assembly",
  "model": "AM-123",
  "owner": "7f9f1b9f9d1b9d1b9f1b9342",
  "image": "https://www.example.com/image.jpg",
  "status": "STOPPED",
  "health": 94
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description        |          Properties          |
| :---------: | :----------------------: | :--------------------------: |
|   **201**   |         Created          |         `data: null`         |
|   **400**   |      Invalid Syntax      | `error: { message, detail }` |
|   **401**   |      Missing Token       | `error: { message, detail }` |
|   **403**   |     Forbidden Token      | `error: { message, detail }` |
|   **409**   | Asset Already Registered | `error: { message, detail }` |
|   **422**   |  Invalid Request Input   | `error: { message, detail }` |
|   **500**   |  Internal Server Error   | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Assets

###### &nbsp; &nbsp; GET _`/assets/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |    10     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |
|  owner   | `String` |    Username of the owner of the asset    |     -     |
|  status  | `String` |           Status of the asset            |     -     |
|  model   | `String` |            Model of the asset            |     -     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |  `data: { Asset[] \| null}`  |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |   Session not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search Asset by id

###### &nbsp; &nbsp; GET _`/assets/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |        `data: Asset`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Asset not Found    | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Update an Asset

###### &nbsp; &nbsp; PUT _`/assets/:id/update`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Assembly Machine - Now with more assembly",
  "description": "This is a machine for assembly, but now we use the Assembly programming language",
  "model": "AM-123",
  "status": "RUNNING",
  "health": 81
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Asset not Found    | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Delete an Asset

###### &nbsp; &nbsp; DELETE _`/assets/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "x-api-key": "extremely-secure-hash-key"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Asset not Found    | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

#
