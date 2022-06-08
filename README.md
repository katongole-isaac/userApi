# User's Api and it's tests (Nodejs Backend)

## Overview

**NB: This project is developed using Nodejs**

> Before we start exploring this project, I want to thank all the developers out there no matter which continent you come from, just know every one depends on you. I mean, do what you do with all your heart and skills, one day the world will your strength and contributions. Bless

As I was on my journey on learning APIs, i came with a simple API that allows the users to read,create, edit and update their bio info. In this project i learned alot of the basic building blocks of APIs. It may not be the best project ever, but i comprises some of the essentials of writing **production code.**

The project has its own **tests** i.e **Unit and Integration tests** int the `test` directory Tests help you to realize bugs early before deploying your code for production environment.

### Description of the project.

`index.js` file is where the application is started.

| **Directory** | **Description**                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `routes`      | comprises of the endpoints where the users can interact with the applcation.                                                  |
| `middleware`  | consists of application middleware used.                                                                                      |
| `models`      | Defines the user schema i.e info to be stored                                                                                 |
| `config`      | Contains the app configs                                                                                                      |
| `start`       | contains the start utilities for the app. As a best pratice never conjest (main file for ur app i.e `index.js` in this case). |
| `test`        | contains tests for thae app i.e Unit and Integration tests                                                                    |

### How to use it.

**NB: This project has no User Interface.**

You can use any **Restful client** application to send **GET,POST,DELETE,PUT** requests.
Applcation is avaliable at [here](c "find me here")

**Endpoints**

- GET requests - use _/user_ e.g https://polar-harbor-53172.herokuapp.com/user
- POST requests - use _/user/add_ e.g e.g https://polar-harbor-53172.herokuapp.com/user/add

**Use any Restful client application. The Browser can also support the **GET** requests.**

If you wish to install it on your local development machine.

- you must have **Nodejs and mongodb** installed. Nodejs engine(16.14.0).
- clone the project
- Run the following to install the dependencies

```bash
$ npm i
```

* Run the following to start mongod daemon on linux

```bash
$ sudo systemctl start mongod
```

- start the app

```bash
$ node index.js
```

Thanks
&copy; 2022 Inc | All rights reserved.
