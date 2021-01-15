# First run

1. Build docker: `docker-compose build`
2. Install api dependencies with yarn: `docker-compose run web yarn install`
3. Create, migrate and seed the database with initial data:
   - `docker-compose run web npx sequelize-cli db:create`
   - `docker-compose run web npx sequelize-cli db:migrate`
   - `docker-compose run web npx sequelize-cli db:seed:all`
4. Start the project: `docker-compose up -d`

## Play

1. Import the postman collection located at the root of this project
2. Play with each endpoint

## Unit tests

To execute all the included tests run:
`docker-compose web run yarn test`

# API

## Transaction

`POST api/transaction`
A transaction inserts and modifies the available cash in the app, if the total amount is lower than the money received we try to give back the best possible amount of bills and coins.

### Input

| attribute | value                                                                                |
| --------- | ------------------------------------------------------------------------------------ |
| total     | transaction total to be paid                                                         |
| amount    | amount received from the customer                                                    |
| money     | array of bills or coins that sum up to the given amount by the customer (see bellow) |

money array:

```json
[{ "value": 100, "amount": 1 }]
```

### Output

Array that indicates the money to give back and the amount of each bill or coin.

```json
[{ "value": 100, "amount": 1 }]
```

### Errors

| Error Code            | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| BAD_INPUT             | total, amount and money are either missing or have a wrong value / type         |
| WRONG_BILLS_OR_COINS  | money array has wrong values or types, make sure it matches the expected object |
| AMOUNT_DOES_NOT_MATCH | the total sum of the money array does not match the received amount             |
| NOT_ENOUGH_CHANGE     | there is not enough money available to give money back to the customer          |
| UNABLE_TO_GIVE_CHANGE | there is not enough bills or coins to give back the correct amount of change    |

## Log

`GET api/log`
Returns a paginated list of logs for inspection in descending order

### Input

| attribute | value                                                |
| --------- | ---------------------------------------------------- |
| limit     | limit resuts per page                                |
| offset    | offset number to move the cursor to a different page |

### Output

Array with the count of total events for pagination and the rows for the current page. Each event specifies the type (ADD, REMOVE or SET) and the amount that was modified to the matching money_id.

```json
{
  "count": 43,
  "rows": [
    {
      "id": 40,
      "money_id": 2,
      "type": "ADD",
      "amount": 2,
      "createdAt": "2021-01-15T18:38:42.000Z",
      "updatedAt": "2021-01-15T18:38:42.000Z",
      "MoneyId": 2
    },
    {
      "id": 43,
      "money_id": 8,
      "type": "ADD",
      "amount": 2,
      "createdAt": "2021-01-15T18:38:42.000Z",
      "updatedAt": "2021-01-15T18:38:42.000Z",
      "MoneyId": 8
    },
    {
      "id": 42,
      "money_id": 6,
      "type": "ADD",
      "amount": 1,
      "createdAt": "2021-01-15T18:38:42.000Z",
      "updatedAt": "2021-01-15T18:38:42.000Z",
      "MoneyId": 6
    },
    {
      "id": 41,
      "money_id": 10,
      "type": "ADD",
      "amount": 1,
      "createdAt": "2021-01-15T18:38:42.000Z",
      "updatedAt": "2021-01-15T18:38:42.000Z",
      "MoneyId": 10
    },
    {
      "id": 39,
      "money_id": 5,
      "type": "SET",
      "amount": 0,
      "createdAt": "2021-01-15T18:26:12.000Z",
      "updatedAt": "2021-01-15T18:26:12.000Z",
      "MoneyId": 5
    },
    {
      "id": 37,
      "money_id": 3,
      "type": "SET",
      "amount": 0,
      "createdAt": "2021-01-15T18:26:12.000Z",
      "updatedAt": "2021-01-15T18:26:12.000Z",
      "MoneyId": 3
    },
    {
      "id": 38,
      "money_id": 4,
      "type": "SET",
      "amount": 0,
      "createdAt": "2021-01-15T18:26:12.000Z",
      "updatedAt": "2021-01-15T18:26:12.000Z",
      "MoneyId": 4
    },
    {
      "id": 34,
      "money_id": 3,
      "type": "SET",
      "amount": 0,
      "createdAt": "2021-01-15T18:25:01.000Z",
      "updatedAt": "2021-01-15T18:25:01.000Z",
      "MoneyId": 3
    }
  ]
}
```

## Set

`POST /api/set`
Set allows you to define a specific amount of bills or coins available at any given time. By passing all the bills and coins with 0 amount you essentialy clear the cashier box.

### Input

Expects a money array as an input:

```json
[{ "value": 100, "amount": 1 }]
```

### Output

Status code 200 if the update was applied.

### Errors

| Error Code | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| BAD_INPUT  | money is not an array or some of its values are missing or have the wrong value / type |

## State

`GET /api/state`
Returns an array with the current state of bills and coins in the cashier box

### Input

none.

### Output

Array with the current state of the app

```json
[
  {
    "label": "100000",
    "amount": 0,
    "value": 100000
  },
  {
    "label": "50000",
    "amount": 7,
    "value": 50000
  },
  {
    "label": "20000",
    "amount": 0,
    "value": 20000
  },
  {
    "label": "10000",
    "amount": 0,
    "value": 10000
  },
  {
    "label": "5000",
    "amount": 0,
    "value": 5000
  },
  {
    "label": "1000",
    "amount": 1,
    "value": 1000
  },
  {
    "label": "500",
    "amount": 0,
    "value": 500
  },
  {
    "label": "200",
    "amount": 2,
    "value": 200
  },
  {
    "label": "100",
    "amount": 0,
    "value": 100
  },
  {
    "label": "50",
    "amount": 1,
    "value": 50
  }
]
```

## Timemachine

`GET /api/timemachine`
Allows you to see the state of the cashier box at any given time. All the events before the time sent will be played back to get back a snapshot of the bills and coins

### Input

| attribute | value                                   |
| --------- | --------------------------------------- |
| date      | date to visualize the cashier box state |

### Output

Same output as the _state_ endpoint with the values for the time sent.

### Errors

| Error Code   | Description              |
| ------------ | ------------------------ |
| DATE_MISSING | date query param missing |
