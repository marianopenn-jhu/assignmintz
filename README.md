![alt text][logo]

[logo]: https://github.com/jhu-oose/2017-group-11/assignmintz/assets/assignmintz.png "Logo"

## Accessing the Application

The application is hosted at
https://mysterious-depths-20159.herokuapp.com/home/.
You must access it through Google Chrome, as we are resolving an issue with font display on other popular browsers.

## Installation for Development

The application is simply installed by running 'source install.sh' on the script
found in the install-scripts directory. In order to run this script, you must have Python 3,
PostgreSQL 9.6, and pip installed on your system.
This script will create and initialize a virtual environment with all the
required packages. It will also create a database named 'assignmintz' and
initialize the database with the required tables. You must also have the react
framework installed. You can build the project using install.sh and then use
run.sh every time you run the project.

### To build and run for local development (localhost:8000/home/):  
    source install.sh  
    source run.sh

### To run tests locally:  
    source run_tests.sh


If you have a previously installed version of Assignmintz and intend to run the
application locally, a few steps are required to get the database models lined
up to the current version of development.

1. Open psql on the command line
2. Type in 'drop database assignmintz'
3. Exit psql
4. Run 'createdb -h localhost -p 5432 -U postgres assignmintz'
5. Run update_migrations.sh

### To build the frontend:  
1. Install npm onto your machine  
2. Navigate to assignmintz/frontend  
3. Type 'npm run static' in your terminal for local development and
    'npm run deploy' for a deployment version

The app should now be ready to go!
Navigate to 'localhost:8000/home/' to begin using the app.

Our deploy process is as follows:

- Make changes to current branch
- Run 'npm run deploy'
- Add/commit changes
- Run 'git push heroku master'
- Run 'heroku run python manage.py collectstatic --noinput'
