# Express Mongodb JWT

Learn to create authentication with express js

## Installation

### Clone

```bash
  git clone git@github.com:sugiartofahmi/express-refresh-token.git
```

### Install

```bash
  yarn
```

### Development

```bash
  yarn dev
```

## Setup

- ENV

  1. rename .env-example to .env
  2. change value on env
     `PORT, DB_URL and JWT_SECRET`

  example :

  ```bash
    PORT = 9000
  ```

  ```bash
    DB_URL = mongodb+srv://<username>:<password>@cluster0.8lcu8fs.mongodb.net/my-db
  ```

  ```bash
    JWT_SECRET = jwtscrect
  ```

# API Spec

## Register

Endpoint : POST /auth/register

Request Body :

```json
{
  "email": "test@gmail.com",
  "password": "passwordmu",
  "name": "Nama Kamu"
}
```

Response Body Success :

```json
{
  "status": "success",
  "user": {
    "_id": "id",
    "name": "Nama Kamu",
    "email": "test@gmail.com"
  }
}
```

Response Body Error :

```json
{
  "status": "failed",
  "message": "email already exist, please login"
}
```

```json
{
  "status": "failed",
  "message": "password not match"
}
```

## Login

Endpoint : POST /auth/login

Request Body :

```json
{
  "email": "test@gmail.com",
  "password": "passwordmu"
}
```

Response Body Success :

```json
{
  "status": "success",
  "user": {
    "_id": "id",
    "name": "Nama Kamu",
    "email": "test@gmail.com"
  },
  "token": {
    "access_token": "unique-token",
    "refresh_token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "status": "failed",
  "message": "account not found"
}
```

```json
{
  "status": "failed",
  "message": "Wrong  password"
}
```

## Refresh Token

Endpoint : POST /auth/refresh

Request Body :

```json
{
  "refresh_token": "unique-token"
}
```

Response Body Success :

```json
{
  "status": "success",
  "access_token": "unique-token"
}
```

Response Body Error :

```json
{
  "status": "failed",
  "message": "Token is not valid"
}
```

## Get User

Endpoint : GET /user/me

Headers :

- Authorization :Bearer token

Response Body Success:

```json
{
  "status": "success",
  "user": {
    "_id": "id",
    "name": "Nama Kamu",
    "email": "test@gmail.com"
  }
}
```

Response Body Error :

```json
{
  "status": "failed",
  "message": "Token is not valid"
}
```

## Logout

Endpoint : POST /auth/logout

Request Body :

```json
{
  "refresh_token": "unique-token"
}
```

Response Body Success:

```json
{
  "status": "success",
  "message": "Logged Out Sucessfully"
}
```

Response Body Error :

```json
{
  "status": "failed",
  "message": "Invalid token"
}
```
