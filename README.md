
# Project Title

We want to create a Library where user can share their books with other users

## API Reference

#### Authentication

```http
  GET /auth
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req`     | `string` | Check if user insert in db |

#### All users

```http
  GET /users
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req`     | `string` | Return users insert in db  |

#### All books

```http
  GET /books
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req`     | `string` | Return books insert in db  |

#### Get library for user
```http
  GET /library/${iduser}
```
| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `req`     | `string` |  **Required**iduser from app  |

Return library for user


#### Insert in db
```http
  GET /insert/${table}
```
| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `table`   | `string` |  **Required**Table where you will insert data  |

#### Update for library
```http
  GET /generic/Library
```
| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `req`     | `string` |  Request with params for update |


## Authors

- Giovanni Ramacciotti


## Deployment

For environments using Node, the easiest way to handle this would be to install serve and let it handle the rest:

```bash
npm install -g serve
serve -s build
```

