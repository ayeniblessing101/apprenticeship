
# Lenken
[![Coverage Status](https://coveralls.io/repos/github/andela/lenken/badge.svg?t=0GlA6W)](https://coveralls.io/github/andela/lenken)
[![Code Climate](https://codeclimate.com/repos/58aaff583de51e3db2001f76/badges/5b62c4058b728e58f3a5/gpa.svg)](https://codeclimate.com/repos/58aaff583de51e3db2001f76/feed)


Mentorship matching and perfomance application.

## Description
Mentorship is an integral part of the fellowship as it encourages fellows to learn different skills from each other hence accelerate the learning process.

Lenken automates the process of matching up mentees with respective mentors thus it facilitates knowledge and skills transfer within the fellowship in the quickest and most efficient way possible by taking advantage of both internal and external mentors .Fellows can easily request mentors and be matched up with appropriate mentors easily through this platform.


## Documentation

[Lenken Master Doc](https://docs.google.com/document/d/10MOo_7a8lPO28zRdXuGeOBWKCCKhwqytyGsWqu4QnZM/edit#heading=h.i0g6fx96qlt)

## Setup
### Prerequisites

- [Node.js](https://nodejs.org/en/)

	- To install node , run this command:

	 ```
	 brew install node
	 ```

	- This will install both node and npm.

- [AngularCLI](https://cli.angular.io/)

	- To install AngularCLI , run this command:

	```
	npm install -g @angular/cli
	```

After installing all the prerequisites, clone the repository:

```
$ git clone https://github.com/andela/lenken.git
```
Then change the directory to the repository:

```
$ cd lenken
```
To install requirements run:

```
npm install
```

This will install all the requirements defined in the `package.json` file inside lenken folder.

To build and run the app, use:

```
ng serve
```

This will bundle all the files using webpack and load the files for you using a custom http server. You'll be able to access the app on `localhost://4200`
or any provided port on the terminal.

## Know Issues while setting up:
- `Invalid host header` error when server is run.

### Solution: 
- Run

	`ng serve --host lenken-dev.andela.com:4200`

### Architecture
Lenken application is written in PHP using Lumen and Angular 2. Lumen is a stunningly fast PHP micro-framework for building web applications with expressive, elegant syntax.It attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as routing, database abstraction, queueing, and caching.

Documentation for the framework can be found on the [Lumen website](http://lumen.laravel.com/docs).


The application is a based on a three-tier architecture having the following layers:

- #### Client layer

	`client` docker container with the angular front-end.

- #### Business layer

	In this layer we have the `nginx`, `api` and `cache` docker containers. It 	provides the business processes logic and the data access.

- Data layer

	It has the `db` docker container which persists the state of the 	application.

Please refer to the application's [docker-compose.yml](https://github.com/andela/lenken/blob/develop/docker-compose.yml).
