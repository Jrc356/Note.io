# Note<span></span>.io
Note<span></span>.io is a dockerized note taking app focused on simplicity! 
This app is centralized around a mysql server and frontend ui in docker containers.

# Usage & Installation
## Docker-compose
### Configuration
To configure the app, alter the variables within `.env`.  
Take note for which variables are for what part of the app. Some variables apply to both the app and the database.  
It is recommended to change password, username, and database root password.  
  
To run in a production environment, the database host may need to be changed. Find this in the `docker-compose.yaml`

### Usage
This is a dockerized app relying on docker-compose. To run, install `docker` and `docker-compose`. Then run the following:  
```bash
$ docker-compose build
$ docker-compose up
```  
This will start the required containers. To access the application, navigate to `localhost:3000` in a web browser  
  
## NPM
install and run in the following order:
1. Database
2. Server
3. Client

### Database
#### Instructions
1. Navigate to the database folder via `$ cd database`
2. (Assuming mysql is already installed and configured) open mysql: `$ mysql` or `$ sudo mysql`
3. source the database using `msql> source Database.sql`

### Server
#### Instructions
1. Open up a new terminal
2. Navigate to the server folder via `$ cd server/`
3. Install necessary dependencies with `$ npm install`
4. Start the server with `$ npm start`

### Client
#### Instructions
1. Open any browser and go to `localhost:3000`
