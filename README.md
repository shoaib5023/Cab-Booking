

# Cab Allocation System
Real time rides can be requested by customers on the system,
which can be accepted by available drivers (who don’t have an ongoing trip). Whichever
driver picks up gets to serve the user. Ride is completed after the customer ends it.

### Further explanation and assumptions:
1. Each customer can request only one ride at a time.
2. Each driver can accept / serve only one ride at a time.
3. Every ride has 3 status - requested, accepted & done.

### Prerequisites

You need to install the following packages for backend:

```
asgiref==3.2.3
Django==3.0.1
django-cors-headers==3.2.0
django-jsonfield==1.4.0
djangorestframework==3.11.0
pkg-resources==0.0.0
pytz==2019.3
six==1.13.0
sqlparse==0.3.0
psycopg2==2.7.4

```
### Installation

Clone the repository

```
git clone https://github.com/Shoaibfy/Cab-Booking/.git
```

Setting up your virtual environment:

```
python3 -m venv .evnv
```

Activating Virtual  Environment

```
source .env/bin/activate
```
Once the repository is cloned and virtual environment set up, go to the directory where the requirements.txt(Catalogue-management-system/backend/) is and type the following code in your terminal:

```
pip install -r requirements.txt
```

### Database setup

If all requirements are installed, then Postgres database must be set up as per stated below.

Activating postgres
```
sudo apt install sqlite

```
Get in to shell
```
sqlite

```
To create a database for our Django project
```
CREATE DATABASE tripcontrol;

```
Create a database user which we will use to connect to and interact with the database. Set the password.
```
CREATE USER admin WITH PASSWORD 'admin';

```
Now, all we need to do is give our database user access rights to the database we created
```
GRANT ALL PRIVILEGES ON DATABASE tripcontrol TO admin;

```
Before running server make sure all migrations done. To exucute all migration
```
python3 manage.py migrate
python3 manage.py makemigrations

```

## Overall detail
```
Database Name: tripcontrol
Username: admin
Password: admin

```

Then to run the server, go to the directory '/Trip-Control/tripcontrol' and type the following code in terminal:

```
python3 manage.py runserver
```

For Frontend which is ReactJS,
Dependencies are: 
```
"nodejs":"^v13.6.0",
"npm":"^6.13.4",
"react": "^16.12.0",
"react-dom": "^16.12.0",
"react-router-dom": "^5.1.2",
"react-scripts": "0.9.5"

```

Go to '/Trip-Control/frontend' and type the following code in the terminal:
```
"sudo apt install nodejs",
"node --version",
"npm install", 
"npm -v",

```
Then to run the react server, type the code:
```
npm start
```

The server has been set up and you are ready to go.
## Usage
### USER
Register as a user <br>
Each user can have only one ride at a time <br>
Enter  user name to Login <br>
Check the previous rides status ,if the status is None user can book a ride.<br>
### DRIVER
Register as a Driver <br>
Each driver can have only one ride at a time <br>
Enter  driver name to Login <br> 
Check the previous rides status  <br>
The requested  ride  from a user will be accepted by the driver.<br>
After completion of ride the status will be updated as 'finished'.<br>

### Status
Ride contains status as 1.Requested,2.Accepted and 3.Done <br>
Requested ride from the user is displayed on the driver panel<br>
On Accepting the request from the user  the status is updated as 'ongoing'<br>
After completion of ride the user can end the trip,then the  status is updated as 'finished'.<br>

### RIDE DETAILS OF USER AND DRIVER
Enter the username to display the ride details in view_ride page <br>
Enter the drivername to display the ride details in view_ride page <br>
