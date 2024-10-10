# Saving Animals #

By: Josh Casey & Jakub Czerniejewski

## **Table of contents**

[[1. Introduction]](#introduction)

> [[1.1 Problem Tackled]](#problem-tackled)
>
> [[1.2 Our product]](#our-product)

[[2. System Architecture]](#system-architecture)

> [[2.1 System architecture
> diagram]](#system-architecture-diagram)
>
> [[2.2 High level overview]](#high-level-overview)
>
> [[2.2.1 React frontend]](#react-frontend)
>
> [[2.2.2 Django backend]](#django-backend)
>
> [[2.2.3 Flask microservice]](#flask-microservice)
>
> [[2.2.4 Go server]](#go-server)
>
> [[2.2.5 Docker]](#docker)
>
> [[2.3 Architectural
> components]](#architectural-components)

[[3. High-Level Design]](#high-level-design)

> [[3.1 Sequence Diagrams]](#sequence-diagrams)
>
> [[3.1.1 Signing up]](#signing-up)
>
> [[3.1.2 Communicating with
> user]](#communicating-with-user)
>
> [[3.1.3 Flask Distance
> Calculation]](#flask-distance-calculation)
>
> [[3.2 Use Cases]](#use-cases)
>
> [[3.2.1 Sign up/Login]](#sign-uplogin)
>
> [[3.2.2 Updating profile]](#updating-profile)
>
> [[3.2.3 Submitting report]](#submitting-report)
>
> [[3.2.4 Booking a vet]](#booking-a-vet)
>
> [[3.2.5 Establishing
> communication]](#establishing-communication)
>
> [[3.3 Entity Relationship
> Diagram]](#entity-relationship-diagram)
>
> [[4. Problems and Resolution]](#problems-and-resolution)
>
> [[5. Testing]](#testing)
>
> [[Installation Guide]](#installation-guide)

# Introduction

## 1.1 Problem Tackled

The problem we tackled during the production of our product was the poor
systems out there for the support of booking veterinary appointments and
making reports to non profit organisations to provide assistance to
animals in need. We overcame this by providing a system that vets,
organisations and users can sign up to, to which the user is presented
with a list of nearest vets that are also signed up to the app. This
eliminates the process of having to search for a vet and an available
booking in a tedious way.

## 1.2 Our product

The product that we have developed provides users, vets and
organisations with an easy to use system to manage reports made, and
bookings made for vet appointments. Upon registering to the website
users of any type will have the option to update their profile and their
current location. Regular users of the app will be able to book
appointments to vets of their choice as they are presented with the
nearest vets based on their location presenting the distance in miles.

The user can pick an available time slot for that vet and submit their
report. Upon submitting the report a chat line will become available
between the user and the vet based on the report made for any inquiries
or updates the vet or user may have. The same goes for the
organisations, if a report is made to an organisation a chat line will
be set up based on the report. Users will also have the option to view
the location of the desired vet or org displayed on google maps.

# 

# 

# 

# 2. System Architecture

## 2.1 System architecture diagram

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image1.png)

## 2.2 High level overview

### 2.2.1 React frontend

Our react frontend provides the user interface for the interactions with
the system*.* This allows the users to update their profiles and manage
their reports and bookings.

Users can view the nearest vets based on their location, book
appointments, submit reports, and engage in chat communication with vets
or organisations once these reports or bookings are made.

It integrates with Google Maps using their q parameter option to display
a vet or org location as follows, it utilises the profiles longitudes
and latitudes and is formatted into the following function
\`https://maps.google.com/?q=\<lat\>,\<lng\>\`.

### 2.2.2 Django backend

Our Django backend is responsible for handling the logic, data storage
and communicating the data to the frontend. It manages user
authentication, profile management, appointment booking and report
submissions.

Django interacts with the Flask app for obtaining nearest vets based on
user location by feeding it the data of the users location and comparing
it to the vets or orgs location.

### 2.2.3 Flask microservice

The flask app uses the data of the user logged in, using their location
to query the backend comparing the longitudes and latitudes of all the
registered vets and orgs. Once the back end is queried the distances
between them are calculated and sorted to display the data onto the
frontend in an easy to read format. This is done via the use of
websockets, connecting the user to the flask app from the endpoint of
the report page.

### 2.2.4 Go server

Go websockets allow the users to have real time communication with the
vet or organisation of their choice based on the report or booking made.
These ensure efficient and instantaneous communication, enhancing user
experience and facilitating timely updates and inquiries of their pets
condition or any general questions.

### 2.2.5 Docker

The entire system is Dockerized, which provides an easy scalable,
portable system for ease of deployment.

Docker containers encapsulate each component of the system, including
frontend, backend, Flask app, Go websockets, database and the api.

## 2.3 Architectural components

### 2.3.1 Go Server

The Go websockets for connecting users to vets or orgs use the logic of
chat rooms. The imports needed to allow functionality for this consisted
of the go websocket package *golang.org/x/net/websocket* for
connections, *net/http* for network handling, *fmt* for formatting and
displaying the actions of the server to the terminal, *sync* for
handling the potential race conditions, *io* for checking for EOF errors
for messages.

Chat room entry points are created upon the submission of a report or
booking. The chat room then becomes specific to this report number to
avoid unwanted users being able to join. The chat rooms are set up so
that they contain a mapping of all connected users setting their
connection status to true upon joining.

The room structure also contains a message field of course and also a
mutex for avoiding race conditions for the Room and Server struct
protecting them from concurrent modifications that can potentially be
caused by goroutines. The Server struct contains a mapping of all the
rooms and also the mutex for the reasons its using the go struct. Upon
starting the go server a new instance of the server struct is
initialised containing the map rooms and their connections.

Upon joining a room, a room id and connection is passed to a function to
handle connecting you to the associated room. It checks to see if the
room exists creating a new room if not, this handles the fact that the
room should exist as the room id is based off the report or booking id
so it is not possible for it not to exist. When successfully connected
to a room the connection map is then updated associating the connection
to the room. Upon leaving a room the user is then deleted from the
mapping. When a user is in a room and connected successfully they can
then broadcast their message to the room to all connected clients in the
room. All this functionality is handled then by a single function with
each function being handled with error checking displaying what is
occurring on each function call, this all happens when the user connects
to the server on port localhost:8080 via the front end message page.

### 2.3.2 Django Rest API

Our Backend is an instance of Django Rest Framework API which serves our
Flask microservice and React JS frontend. The Rest API is built on top
of Django which is a high-level Python web framework that encourages
rapid development and clean, pragmatic design.

Django Rest Framework builds on top of Django by allowing users to build
working APIs without having to deal with building the whole set-up to
launch such a service which allowed us to focus on our database
structure and the unique aspects of our project. Since DRF uses Python
the coding syntax is quite simple and it has amazing community support
on top of that.

**django-cors-headers** which is an application for handling the server
headers required for Cross-Origin Resource Sharing that we used to
ensure the cookies were passed to the React frontend,

**django-environ** that enables us to use .env files in our API set-up,

**djangorestframework** which is used as a middleware to build the
restful API,

**netcat, gcc, postgresql** which are all used for our Database set up,

**libproj-dev, gdal-bin, python3-gdal** these liberties are used by out
DRF API to connect to Postgres and to process geo-coordinates which we
use for the users location.

**Whitenoise** which we use to serve static files from our React front
end as Django doesn\'t support such functionality by default.

All of these libraries are powerful and essential for this project.

The settings.py file is one of the most important parts of this project,
here we define our allowed host which is a list of strings representing
the host/domain names that this Django site can serve.

We access all our environment variables from the .env file which looks
like this sample one

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image37.png)

Where SECRET_KEY is used for Unique tokens for a user session, password
reset requests, and messages, which is essential for our Authentication
system that user session authentication with the use of cookies.

DEBUG is a boolean used to determine whether the App should run in Debug
mode with all the additional information for bug fixed or not (for
production)

All the other stuff is the credentials we use to connect to our
database.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image2.png)
On top of this, we install our apps like so,

define our middleware, in our case it is whitenoise and
SessionMiddleware we use for authentication

We also defined our Static Template configuration for our backend to
have access to static files compiled by the React front end, this is set
up following Whitenoise docs to ensure compatibility with STATIC_URL,
STATICFILES_DIRS, STATIC_ROOT and the path to our BASE.html. Our
base.html file is set up in a way to handle both a development and
production environments as it checks the DEBUG environment variable and
returns the path to static files or our Vite React frontend.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image30.png)

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image6.png)

As you can see we are also setting INTERNAL_IPS to allow the sharing of
information through our docker containers, this is similar to allowed
hosts but since the containers do not have a set stone IP we use this
smart socket script to grab them all alongside all the ones that don\'t
change as localhost 0.0.0.0 and a hotspot IP we use for testing
production on the phone.

Another integral component of the Rest API is the models.py file which
contains and manages data through Python objects referred to as models.
Models define the structure of stored data, including the field types
and possibly also their maximum size, default values, selection list
options, help text for documentation, and label text for forms. Here is
one of our Models for a user profile alongside the imports we use.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image10.png)

All of these are fields for making tables in our Postgres with PostGIS
database, one field stands out which is the models.PointField is used to
store geo coordinates in the right format. This field is imported from
gis.goes. Another field of interest is the models.OneToOneField which is
used for the user with the on_delete option set to models.CASCADE, this
is a flag for the model to delete UserProfiles if the User is deleted.

While the models.AutoField makes a unique ID that increments with each
model made.

Serializers allow our DRF API to convert complex data types, such as
Django model instances, into Python data types that can be easily
rendered into JSON, XML, or other content types, in our case it is JSON
to be returned by our API endpoints. Here is a snippet example of one of
our serialisers.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image27.png)

We are using a serializer template from the rest framework in which we
define the Metadata that includes our Model the fields we can Serialize
and the depth of the returned data. In this case, it needs to be at
least one as this model has other models attached to it which need to be
expanded by our serialised, if we don\'t provide this attribute all we
will get back is primary keys.

Views.py is where the main chunk of code for our API resides. Here we
define all the HTTP request types and the endpoints themselves which use
the Models and Serializers we made. Here is an example of a View.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image19.png)

We are using a decorator to ensure the CSRF cookie is being dispatched
to the signup page for the user. Permission_classes are set to Any as
all users should be able to sign up, almost all of our views do not have
that line. This View is for a post request which grabs the data from our
sign-up frontend form, validates them, makes a user and sends back a
response. Some of the Views return serialized objects which are then
displayed in the frontend. We have two Views.py files for accounts and
user_profiles both with multiple HTTP request methods and a lot of API
View classes for them.

Finally, the component that makes these views accessible urls.py which
looks like like this.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image31.png)

This snippet only shows a few of the many imported views and assigned a
URL path to make them accessible to our front end.

### 2.3.3 React Frontend

React JS is a modern single-page frontend library which is maintained by
Meta and a community of individual developers and companies. It uses
frameworks like Next.js and Vite. It is based on components which allow
the developers to put their markup, CSS, and JavaScript.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image33.png)

Our React front end is built using Vite which is a local development
server that supports JSX and JS. This is the perfect combination for our
project. Vite also has a build command which makes static files for
production. We needed to modify it quite a lot to accommodate installing
it as a template in our Django Rest backend. It produces randomly named
files for the CSS and JS which makes it incredibly tough to implement it
inside our base.html, this rollupOptions object grabs the file names
generated by Vite and changes them to our set path and name.

It relies heavily on NPM to install its packages, we are using the
following ones:

\"@reduxjs/toolkit\": \"\^2.1.0\",

\"axios\": \"\^1.6.7\",

\"bootstrap\": \"\^5.3.2\",

\"cors\": \"\^2.8.5\",

\"js-cookie\": \"\^3.0.5\",

\"react\": \"\^18.2.0\",

\"react-bootstrap\": \"\^2.10.0\",

\"react-dom\": \"\^18.2.0\",

\"react-redux\": \"\^9.1.0\",

\"react-router-dom\": \"\^6.21.3\",

\"socket.io\": \"\^4.7.4\",

\"socket.io-client\": \"\^4.7.4\"

Our Front end is split into Hocs and Components. It is styled using
React Bootstrap and

All the state is managed by React Redux. While the main driving force of
React is App.jsx and main.jsx.

App.jsx is what people tend to call the file which contains the main
logic of your file, or in React case, the main component, the one that
represents your entire application/website.

While main.jsx renders all the components into the browser, in our case,
it also has the Provider component that attaches our Redux store to it.

Hocs include our Layout and Private routes for different User types.

This is the Layout component.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image4.png)

It imports MyNavbar alongside children which in this case are the
Routes(Links to components). What this means is that the navbar will be
attached on top of all the other components without having to put it
separately to all of them.

On top of that, it uses Redux dispatch functionality to check whether
the user is authenticated and loads the user profile if that is the
case. Since all the children are all of our Routes this means that the
user\'s Profile and the Authentication check is always
dispatched.![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image20.png)


This is one of three Private Routes we have, It checks whether the user
is authenticated by getting the boolean isAuthenticated and comparing
the user type. These are pieces of state dispatched by redux. If the
values match an Outlet for the following routes is created.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image26.png)

Otherwise, the user gets navigated to the login page. Defining private
routes used to be a lot easier in RouterDom v5 but since v6 only Routes
are valid BrowseRouter children meaning we can\'t just put any component
we like in it, we are tricking the router by rendering a component that
is an outlet.

Components are the actual pages in a react application, they are
rendered by the router on a single page even though the URL changes in
the browser window. These are predominantly written in JSX which allows
us to include JavaScript expressions and functions within the syntax
alongside HTML. This is very powerful as we can add logic, functions and
other JS goodies directly into our components. JSX allows us to create
more complex and functionally rich pages. Here are parts of our
ExperimentMes component.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image3.png)

At the top is the Component declaration with all the Redux dispatch
functions passed into it which we will dive more into in our Redux
section.

All of our components use some sort of Hooks(allow function components
to have access to state and other React features), in this case, it is
useSelector, useState and useEffect.

The booked const variable is assigned state.vet.booked from our global
state through the use of useSelector, this hook is particularly useful
as it will update the variable if that piece of state changes which
useState does not support.

vetType is a useState variable which assigns it a value in React state,
we can change the boolean with the setVetType function this is done in
our handleClick events which are attached to buttons. Ie. If a button is
clicked the state changes. This is extremely useful when displaying
information as we can use these boolean variables to trigger our
component to show x but not
y.![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image12.png)

Our final hook is useEffect which executes its body every time the
component is rendered.

In our case, it checks whether to load reports or all booked schedules,
we also added type as a dependency this means that useEffect will
execute if a change is made to type, for us this happens when the
dispatch state is loaded in.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image41.png)

We can define functions like so inside our component this allows us to
render multiple pieces of JSX from one place, which otherwise would have
to be split into separate files.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image36.png)


Here we have JS logic embedded into HTML, which allows us to display
functions based on conditions, in this case, we are checking if the use
bookings are loaded in and if the user type is Vet.

The fact that we are splitting all the parts of this component makes it
a lot easier to debug and style, on top of that this component is used
by three user types which are all handled by our logic. As you can see
we are just returning the links function.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image5.png)


Each component is a little different, they use .map functions to iterate
through lists and they use React Bootstrap for styling which is a CSS
library that uses components to tidy up the code and make it more
React-like.![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image24.png)


Here is a snippet of code from a component, Container is functionally a
div, row, col and button are self-explanatory. There are also
Bootstrap-specific components such as ButtonGroup. They all interact
with standard Bootstrap syntax such as className=xyz.

### 2.3.4 React Redux

Is a Javascript library designed to manage global states in React JS
applications which allows components to access and interact with
variables, on top of that it provides great tools for debugging. Its
only downside is the amount of complex set-up necessary to implement it.
Redux consists of three main components Store, Actions and
Reducers.![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image40.png)

The store is like a bucket which stores all of our reducers that are
used and defines the initial global state for our App, here is a code
snippet.

rootReducer is called index.js by default.

Speaking of reducers they are the logical brain of redux, they dispatch
and update the state based on which actions were called. It is crucial
to set them up correctly as it is quite difficult to debug them because
errors don\'t show up apart from the dispatch Type that tells us that
something is wrong therefore syntax plays a key role in the setup. Below
is a reducer we made for profile state manipulation.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image32.png)


Up at the top of the file, we are importing the different dispatch types
which are also used in actions.

The initial state is defined below. This is the state we are starting
with.

Reducers use a switch case that checks the type and returns either the
previous state which is defined by \...state

Or the previous state with extra information

as seen in LOAD_USER_PROFILE_SUCCESS. The payload is the data we are
sending from our actions. This process is quite tedious as each dispatch
type has to be incorporated which can cause reducers to grow rapidly.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image29.png)


Actions are essentially asynchronous functions which can take in
parameters from the front end and do something like fetch and process
data which is then passed to reducers. Our actions call our API using
Axios which returns serialised JSON objects that we use in our frontend
by accessing the dispatched state.

Here is an Axios Put Request for the org location. It consists of a
Config header a Body and a Vite env variable which is a link to our API
endpoint. It uses await to ensure the data is sent before it gets
dispatched below.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image14.png)

Here is the rest of the Action, as you can see this is where we Dispatch
the state to our reducers which consists of the Type and Data from our
request. We also use a try-catch block to make debugging easier.

So the whole process would look like so. React frontend gets the form
information from its useState hooks, and puts it into this Redux action
that has been imported and attached to the component using connect()
which sends a request to our Django Rest Api that validates, collects,
serialises and returns the data from our Postgres DB, which is then
attached to a Type and sent to a reducer which dispatches it into our
global state store.

### 2.3.4 Docker

Our last Major Architectural Component is Docker which is a software
platform that allows you to build, test, and deploy applications
quickly. Docker packages software into standardized units called
containers that have everything the software needs to run including
libraries, system tools, code, and
runtime.![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image28.png)


Our project is fully Dockerised meaning it can be deployed anywhere with
a simple make build and make up command from our code directory as long
as the user has Docker Desktop installed and running. All the containers
have unique Dockerfiles for set-up. These contain a set of instructions
for building a Docker Image that is used to build a container.

Above is the Dockerfile for our Django Rest API. Up the very top, we
define the Python image we will be using for Django in our case it\'s
slim-bullseye which is a light distro of Python. RUN is a keyword which
runs commands when the image is being made, here we put global
dependencies such as netcat and gcc which are essential for Postgres.
COPY just copies whatever files from our current directory into the
Container Image. In this case, it\'s requirements.txt and the entire
working directory which contains Django in it.

Next comes the docker-compose file which allows us to deploy multiple
containers from different images all at once. It uses yml which is a
markup language that focuses on indentation.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image21.png)


This is a code snippet from our docker-compose file which is used to
build the API container.

**Build:** we define the location of the Dockerfile we want to use to
set up the image.

**Command:** allows us to execute a command in the terminal of our new
container, in this case, it is the command to run our DRF API.

**Volumes:** help allow us to save our container data onto our machine
this also means that any changes will update the container on the next
make down make up cycle.

**Ports:** Map a container port to a port on our machine.

**Env_file:** is the evn file our container should use.

**Restart:** defines our restart policy in this case it\'s on failure.

**Depends_on:** tells the container to wait on the specified containers.

**Networks:** allow the containers to communicate with each other if
they are on the same network.

All of our moving parts include their own Docker container, this allows
for fast deployment anywhere without worrying about dependencies and
system architectures.

Our third-Party Components include Geoapify geolocation, React-Redux,
PostGIS, Axios

# 3. High-Level Design

## 3.1 Sequence Diagrams

### 3.1.1 Signing up

Signing up requires you to select a user type and then fill in your
information form. Upon submitting your username and password, these
credentials are assigned to the django models to make sure they are
valid. If correct credentials are provided a user will be created and
stored in the system, allowing the user to login and customise their
account. If the user submits invalid credentials they will have to try
again in order to successfully create a user.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image15.png)
### 3.1.2 Communicating with user

A user selects a communication channel based on their report, sending
the report id to the server to construct the chat room based on that id
while also sending information of the user to the server. When this is
completed the user uses his connection and report id to join the room
establishing a connection between the chat page and the room in the
server. The user can then broadcast his messages to the server emitting
its room Id and message to the server for the server to then send the
message to the room. Upon completion of this sequence the messages can
be then constantly received and displayed onto the frontend.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image39.png)

### 3.1.3 Flask Distance Calculation

The user confirms their location sending it to the react frontend page
to where this is then emitted via sockets using socket io to our flask
application. The flask app then runs a loop querying all the vets and
orgs stored in the backend. These queries use the vets and orgs location
to compare it to the users location to there then the flask app
calculates the distance between them. When all these calculations are
complete the flask app then emits the data to the react page displaying
the vets or orgs from nearest to furthest distance in miles.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image7.png)

## 3.2 Use Cases

### 3.2.1 Sign up/Login 

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image35.png)

### 3.2.2 Updating profile

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image16.png)
### 3.2.3 Submitting report

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image13.png)

### 3.2.4 Booking a vet

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image25.png)

### 3.2.5 Establishing communication

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image23.png)

## 3.3 Entity Relationship Diagram

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image11.png)

## 3.4 React component Diagram

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image43.png)

## **4. Problems and Resolution**

### 4.1 Go Versions 

Upon creating a Go server using imported 3rd party libraries, we
encountered the problem of conflicting Go versions. This is due to the
fact that at this point of time the server was being run locally on the
machine and when I pushed the working version, Jakubs version of go was
outdated and the libraries could not be downloaded. This was resolved by
compiling the server into an executable and then this was dockerized
allowing jakub to run the server correctly.

### 4.2 Geolocation not working

Initially during the production of our web app, for getting the user\'s
current location we were using the HTML5 \`geolocation.navigator\`
function however this could not work as we found out that it does not
support http unless its localhost and we needed to demonstrate this
using a phone connected to this hotspot. We overcame this by using the
geoapify api to get the users location.

### 4.3 Cors and Docker

We decided to use Docker for our entire application which is great but
we ran into CORS issues even though all of our apps are running on
Localhost, this is due to the fact that docker containers have their own
individual IP's. This meant that we cannot pass cookies into our
frontend as its on a different internal ip. Our solution for this
problem was installing our frontend in django templates which allows it
to run on the same internal ip and port.

## **5. Testing**

## 5.1 Unit Testing

We used a variety of techniques for our unit testing: including Postman,
React-Redux-Devtools and Predetermined Unit test that we made for our
system components.

React Front-End Unit Tests

### Unit Test for Loggin In ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 1.0 | **Test Date** | January 21, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**   Logging in |
| **Pre-requisites**  User has an account  |
| **Location/Server**  Saving Animals Test Server v1.0  **Dependencies**  Existing account sign-up
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Successful Login attempt<br>A successful invalid password prompt<br>A successful this field is required prompt<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. Enter valid username | Able to enter text in the username text field | Behaved as expected | Pass<br>
| 2\. Enter a valid password | Able to enter text in the password text field | Behaved as expected | Pass<br>
| 3\. Click the Log-in button | Able to click the Log-in button; Clicking routes the user to the App home page | Behaved as expected | Pass<br>
| <br>**ALTERNATIVE FLOW 1:** **_Invalid Password_**<br> |
| 1\. Enter valid username<br> | Able to enter text in the username text field | Behaved as expected | Pass<br>
| 2\. Enter invalid Password | Able to enter text in the username text field | Behaved as expected | Pass<br>
| 3\. Click the Log-in button | Able to click the Log-in button; Clicking routes the user to "Sorry, the password you provided did not match your username" | Behaved as expected | Pass<br>
| <br>**ALTERNATIVE FLOW 2:** **_Password not Inputed_**<br> |
| 1\.User name not entered | No notification from the username textfield | Behaved as expected | Pass<br>
| 2\. Enter valid Password | Able to enter text in the password text field | Behaved as expected | Pass<br>
| 3\. Click the Log-in button | Able to click the Log-in button; Clicking routes the user to "This field is required" | Behaved as expected | Pass<br>

### Unit Test for Accessing Chats ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 2.1 | **Test Date** | February 21, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  Accessing Chats |
| **Pre-requisites**  User is logged in  |
| **Location/Server**  Saving Animals Test Server v2.1  **Dependencies**  User has an account<br>User has accessed reports/bookings
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Entering a chat room sending a message successfully.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\.User presses the communicate button on their report/booking<br> | User is redirected to Chat page. | Behaved as expected | Pass<br> |
| 2\. No user input | Chat displays alongside send message button | Behaved as expected | Pass<br> |
| 3\. User inputs a message into field | Able to enter text in the usename text field | Behaved as expected | Pass<br>|
| 4\. User presses Send Message | Message displays both on userside and vet/org side. | Behaved as expected | Pass<br>

### Unit Test for Authentication ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 1.8 | **Test Date** | February 19, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  User tries to access links that they dont have permissions for |
| **Pre-requisites**  Need an account created in the app |
| **Location/Server**  Saving Animals Test Server v1.0  **Dependencies**  User is not logged in 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
User get successfully bounced to login page when accessing any link apart from Register, Home and Login.<br>User get successfully redirected to home page when accessing a link designed for a different user type.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. User logs out | User gets redirected to home page. | Behaved as expected | Pass<br> |
| 2\. User enters the Url to Dashboard | User is redirected to the log in page. | Behaved as expected | Pass<br> 

**ALTERNATIVE FLOW 1:** **_Invalid Re-Password_**<br>
**User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?**<br> |
| 1\.User logs in as a 'User' | User gets redirected to home page. | Behaved as expected | Pass<br> |
| 2\. User enters the Url to Vet Profile | User gets redirected to home page as the authentication required is not present | Behaved as expected | Pass<br>

### Unit Test for Signing Up ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 1.7 | **Test Date** | February 18, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  Accesing Navbar |
| **Pre-requisites**  User is logged in  |
| **Location/Server**  Saving Animals Test Server v1.7  **Dependencies**  Existing account sign-up<br>User Type is defined  
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Navbar displays and works<br>Navbar updates depending on user type<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. User is redirected to the home page by logging in as 'User'. | User lands on the homepage. | Behaved as expected | Pass<br> |
| 2\. User is on their phone and presses the three horizontal bars on top of their screen to show nav links. | Nav links appear in a dropdown menu | Behaved as expected | Pass<br> |
| 2.1 User is on a laptop or desktop and accesess the home page. | Nav links appear fully accessible | Behaved as expected | Pass<br> |
| 3\. User presses on Dashboard. | User gets brought to Dashboard page. | Behaved as expected | Pass<br> 

**ALTERNATIVE FLOW 1:** **_Navbar updates for a Vet_**<br>
**User Input** | **Expected Result** | **Actual Result** |**Pass/Fail**<br> |
| 1\. User is redirected to the home page by logging in as 'Vet'. | User lands on the homepage. | Behaved as expected | Pass<br> |
| 2\. User is on their phone and presses the three horizontal bars on top of their screen to show nav links. | Nav links appear in a dropdown menu | Behaved as expected | Pass<br> |
| 2.1 User is on a laptop or desktop and acceses the home page. | Nav links appear fully accessible | Behaved as expected | Pass<br> |
| 3\. No user input required | Nav links are different than when they were logged in as a 'User' | Behaved as expected | Pass<br> |
| 4\. User presses on Vet Profile. | User gets brought to Vet Profile page. | Behaved as expected | Pass<br>

### Unit Test for Signing Up ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Josh Casey |
| ---| ---| ---| --- |
| **Release Version** | 1.0 | **Test Date** | January 21, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  Signing in |
| **Pre-requisites**  User does not have an account |
| **Location/Server**  Saving Animals Test Server v1.0  **Dependencies**  No dependencies present 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Successful Sign up attempt<br>A successful invalid password pass word and re-password not match validation<br>A successful message saying this field needs to be at least 6 characters long<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. Select the type of user by pressing one of the buttons | Select the type of user by pressing one of the buttons | Behaved as expected | Pass<br>|
| 2\. Enter a username | Able to enter text in the usename text field | Behaved as expected | Pass<br>|
| 3\. Enter a valid password | Able to enter text in the password text field | Behaved as expected | Pass<br>|
| 4\. Enter an the password again in the re-password field | Able to enter text in the re-password text field | Behaved as expected | Pass<br>|
| 5\. Press the register button | Register is successful, the user now has an account with the correct profile attached; Is redirected to the home page. | Behaved as expected | Pass<br>

**ALTERNATIVE FLOW 1:** **_Invalid Re-Password_**<br>
**User Input** | **Expected Result** | **Actual Result** |**Pass/Fail**<br> |
| 1\.Select the type of user by pressing one of the buttons.<br> | Select the type of user by pressing one of the buttons | Behaved as expected | Pass<br> |
| 2\. Enter a username | Able to enter text in the usename text field | Behaved as expected | Pass<br> |
| 3\. Enter a valid password | Able to enter text in the password text field | Behaved as expected | Pass<br> |
| 4\. Enter an invalid password in the re-password field | Able to enter text in the re-password text field | Behaved as expected | Pass<br> |
| 5\. Press the register button | Register failed, as the two passwords do not match, nothing happens | Behaved as expected | Pass<br> |
| <br>**ALTERNATIVE FLOW 2:** **_Password is too Short_**<br> |
| **User Input** | **Expected Result** | **Actual Result**| **Pass/Fail** <br> |
| 1\. Select the type of user by pressing one of the buttons.<br> | Select the type of user by pressing one of the buttons | Behaved as expected | Pass<br> |
| 2\. Enter a username | Able to enter text in the usename text field | Behaved as expected | Pass<br> |
| 3\. Enter a password that is less than 6 characters in length | Able to enter text in the password text field | Behaved as expected | Pass<br> |
| 4\. Enter an the same short password into re-password field | Able to enter text in the re-password text field | Behaved as expected | Pass<br> |
| 5\. Press the register button | Register failed, as the two passwords are too short, user gets a prompt saving the passwords should be at least 6 characters long. | Behaved as expected | Pass<br> 



### Unit Test for Displaying Vets/Orgs ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Josh Casey |
| ---| ---| ---| --- |
| **Release Version** | 2.0 | **Test Date** | February 20, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  Displaying Vets/Orgs |
| **Pre-requisites**  User has an account |
| **Location/Server**  Saving Animals Test Server v2.0  **Dependencies**  User is logged in as User<br>User has the correct User Type<br>Flask micro service is running 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Nearest Vets and Orgs Display for the User.<br>Flask Microservice being down being handeled.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. User presses on the Vets or Orgs Navbar link | User is redirected to Vets/ Orgs page. | Behaved as expected | Pass<br>|
| 2\. No user input | A Form is being Displayed, and a Show Neares Orgs or Vets button. | Behaved as expected | Pass<br>|
| 3\. User presses the Show Nearest Orgs/Vets button | An alert with the users location shows up | Behaved as expected | Pass<br>|
| 4\. User presses Ok | User location gets sent to Flask back end which returns a sorted list of Orgs/Vets based on distance to the user. | Behaved as expected | Pass<br>

**ALTERNATIVE FLOW 1:** **_Flask Microservice being down._**<br>
**User Input** | **Expected Result** | **Actual Result** |**Pass/Fail**<br> |
| 1\. User presses on the Vets or Orgs Navbar link | User is redirected to Vets/ Orgs page. | Behaved as expected | Pass<br>|
| 2\. No user input | A Form is being Displayed, and a Show Neares Orgs or Vets button. | Behaved as expected | Pass<br>|
| 3\. User presses the Show Nearest Orgs/Vets button | An alert with the users location shows up | Behaved as expected | Pass<br>|
| 4\. User presses Ok | The front end tries to display the send the location through the websocket but is un able to, noting happends | Behaved as expected | Pass<br>


### Unit Test for Vet Schedule ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 2.0 | **Test Date** | February 20, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  Accessing Vet Schuedule as a Vet |
| **Pre-requisites**  User is logged in as a Vet |
| **Location/Server**  Saving Animals Test Server v2.0  **Dependencies** Existing account sign-up<br>User Type is defined 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Nearest Vets and Orgs Display for the User.<br>Flask Microservice being down being handeled.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. User presses the Vet Schedule navlink | User lands on the Vet Schedule page | Behaved as expected | Pass<br> |
| 2\. No user input | User is presented with a Date field, Bookings, Available and options to create a Available and and to add a new time slot to a day | Behaved as expected | Pass<br>|
| 3.1.1 User clicks on a calendar icon in the date field and chooses a date. | The Available and Bookings update automatically for the ones for this date | Behaved as expected | Pass<br> |
| 3.1.2 User clicks on Add a new time slot | A drop down menu shows up with all the times that can be added for this date. | Behaved as expected | Pass<br> |
| 3.1.3 User selects a time and presses Add Time | The Available and Bookings update automatically and so does the time selection | Behaved as expected | Pass<br> |
| 3.1.4 User presses the Delete button on one of the available bookings | The time slot get deleted and the page refreshes | Behaved as expected | Pass<br> 

### Unit Test for Accessing Reports/Bookings ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Josh Casey |
| ---| ---| ---| --- |
| **Release Version** | 2.0 | **Test Date** | February 20, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  Accessing Reports/Bookings |
| **Pre-requisites**  User has an account  |
| **Location/Server**  Saving Animals Test Server v2.0  **Dependencies**  User is logged in as User or Vet or Org<br>User has the correct User Type
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
Showing Reports/Bookings for the User, Vet and Org work.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** |**Pass/Fail?** <br>|
| 1\. User presses Message on their navbar<br> | User is redirected to Message page. | Behaved as expected | Pass<br> |
| 2\. No user input | If user is an Org the reports display | Behaved as expected | Pass<br> |
| 2.2\. No user input | If user is a Vet the booked schedules appear. | Behaved as expected | Pass<br> |
| 2.3\. No user input | If the user is just a User two buttons display; Show your reports and Show your bookings. | Behaved as expected | Pass<br> |
| 2.3.1\. User presses show your reports | Users reports are displayed and bookings that were displayed before go away | Behaved as expected | Pass<br> |
| 2.3.2\. User presses show your bookings | Users bookings are displayed and reports that were displayed before go away | Behaved as expected | Pass<br>


Django Rest Api Tests with Postman

For our Rest API, we used Postman which is a platform for building and
using APIs that is commonly used to test Endpoints by making requests
from the app directly to the backend without the need for additional
set-up of a dummy frontend which is quite time-consuming.

It allows the user to set all the necessary parameters and headers for
all kinds of HTTP requests which are essential for testing apps that
implement user authentication with tokens or cookies like in our case.
On top of that, you can send JSON bodies with POST requests and you can
view backend responses as well.

Most of our API endpoints have been tested with Postman which can be
seen here.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image34.png)

Here is what request headers look like for POST requests

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image17.png)

Since we are dispatching a CSRFToken for our users we need to pass it in
Postman in the X-CSRFToken header, alongside the application-json header
to be able to access the endpoints which require authentication which is
all of them bar the login and register ones.

Here is what a raw JSON body would look like.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image38.png)

Here we are specifying all the information needed for our make-a-report
endpoint which will be retrieved by our frontend.

This is what a successful response will look like.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image18.png)

While an unsuccessful response could take many forms depending on the
error, here is an example of the cookie being wrong

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image42.png)

Redux State Tests with Redux-Devtools

We used Redux-Devtools to test all our dispatch states when we were
developing our front end to ensure that the global state we were using
for our pages was there. Redux-Devtools shows us how the state changes
with each change we make on the front end. This is a lot better than
trying to track Props in Reacts which gets quite messy due to the
complexity of passing information between the static pages in React JS.

Here is our Dispatch State for the Login page.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image9.png)
As you can see we can see the actions on the left-hand side of the
picture which show us, that since the user isn\'t logged in we failed to
Authenticate them and load their profile, likewise the state is set to
its default value. Which is seen below.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image22.png)

But as soon as we log in we can see that the authentication succeeds and
the vet profile in this case is loaded in.

![](vertopal_e0127c3fe0074422abacfe77acaa2389/media/image8.png)

We have carried out tests like this for all the individual dispatch
states to ensure that our state is there for our frontend pages with
rely on it, it also helped us find issues with dispatch calls and we
were able to track them down more easily.

## 5.2 Integration Testing

### Integration Test One ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 22, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
|**User Story**  Signing up, Logging in, Viewing Profile, and Editing Profile | 
| **Pre-requisites**  User has access to the internet |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  No dependencies 
| **Required Configuration**  No configuration needed |

 <br>**RESULTS SUMMARY**<br> 
 User was able to sign up, log, in view their profile and edit it.<br>
 <br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** | **Pass/Fail?** <br>|
| 1\.Select the type of user by pressing one of the buttons | Select the type of user by pressing one of the buttons | Behaved as expected | Pass<br> |
| 2\. User inputs a username | User is able to access the username field and input a value.  | Behaved as expected |  Pass<br>|
| 3\. User inputs a password | User is able to access the password field and input a value.  | Behaved as expected | Pass<br>|
| 4\. User inputs a re-password | User is able to access the re-password field and input a value. | Behaved as expected | Pass <br>|
| 5\. User presses register button | User is redirected to the login page. | Behaved as expected | Pass<br> |
| 6\. User inputs their username | User is able to access the username field and input a value.  | Behaved as expected | Pass<br> |
| 7\. User inputs their password | User is able to access the password field and input a value.  | Behaved as expected | Pass<br> |
| 8\. User presses the log in button | User is redirected to the login page. | Behaved as expected | Pass<br> |
| 9\. User presses the Dashboard navlink | User is redirected to their Dashboard. | Behaved as expected | Pass<br> |
| 10\. No user input | User's Profile information is displayed | Behaved as expected | Pass<br> |
| 11\. User clicks on the First Name field and changes its value | User can access the First Name field | Behaved as expected | Pass<br> |
| 12\. User clicks on Update Profile button | The value for first name changes | Behaved as expected | Pass<br> 

### Inregration Test Two ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Jakub Czerniejewski |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 22, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
|**User Story**  Logging in, accessing reports, chat and sending a message | 
| **Pre-requisites**  User has access to the internet |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  User has an account 
| **Required Configuration**  No configuration needed |

 <br>**RESULTS SUMMARY**<br> 
 User was able to log in, accesses reports and chats and was able to send a message.<br>
 <br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** | **Pass/Fail?** <br>|
| 1\. User inputs a username | User is able to access the username field and input a value.  | Behaved as expected  Pass<br>|
| 2\. User inputs a password | User is able to access the password field and input a value.  | Behaved as expected | Pass<br>|
| 3\. User presses the log in button | User is redirected to the login page. | Behaved as expected | Pass<br> |
| 4\. User presses the Messages navlink | User is redirected to their message page. | Behaved as expected | Pass<br> |
| 5\. User presses show my reports button | User's reports are displayed with a communicate button | Behaved as expected | Pass<br> |
| 6\. User clicks on the communicate button | User is redirected to a chat with their an org | Behaved as expected | Pass<br> |
| 7\. User inputs a message and presses Send Message | Message is displayed for both the user and the org | Behaved as expected | Pass<br> 

### Inregration Test Three ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Josh Casey |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 22, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
|**User Story**  Logging in, showing nearest vets filling in a report and making a booking | 
| **Pre-requisites**  User has access to the internet |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  User has an account 
| **Required Configuration**  No configuration needed |

 <br>**RESULTS SUMMARY**<br> 
 User was able to log in, see their nearest vets, fill a report and make a booking.<br>
 <br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** | **Pass/Fail?** <br>|
| 1\. User inputs a username | User is able to access the username field and input a value.  | Behaved as expected  Pass<br>|
| 2\. User inputs a password | User is able to access the password field and input a value.  | Behaved as expected | Pass<br>|
| 3\. User presses the log in button | User is redirected to the login page. | Behaved as expected | Pass<br> |
| 4\. User presses the Vets navlink | User is redirected to the vets page. | Behaved as expected | Pass<br> |
| 5\. User inputs a date for their bookings by clicking on the calendar icon | User can access the date field | Behaved as expected | Pass<br> 
| 6\. User presses show nearest vets button | An alert shows up with the users location | Behaved as expected | Pass<br> |
| 7\. User clicks Ok on the alert | Nearest Vets and are displayed alongside the booking slots | Behaved as expected | Pass<br> |
| 8\. User inputs report information in the form fields | User can access the fields | Behaved as expected | Pass<br> |
| 9\. User presses the make booking button | booking is made | Behaved as expected | Pass<br> 



## 5.3 System testing

### Whole System Test ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Josh Casey |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 22, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
|**User Story**  Testing all the system Functionality | 
| **Pre-requisites**  User has access to the internet |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  User has an account 
| **Required Configuration**  No configuration needed |

 <br>**RESULTS SUMMARY**<br> 
 User was able to log in, see their nearest vets, fill a report and make a booking.<br>
 <br>**RESULT DETAILS**<br> 
 **User Input** | **Expected Result** | **Actual Result** | **Pass/Fail?** <br>|
| 1\. User inputs a username | User is able to access the username field and input a value.  | Behaved as expected  Pass<br>|
| 2\. User inputs a password | User is able to access the password field and input a value.  | Behaved as expected | Pass<br>|
| 3\. User presses the log in button | User is redirected to the login page. | Behaved as expected | Pass<br> |
| 4\. User presses the Vets navlink | User is redirected to the vets page. | Behaved as expected | Pass<br> |
| 5\. User inputs a date for their bookings by clicking on the calendar icon | User can access the date field | Behaved as expected | Pass<br> 
| 6\. User presses show nearest vets button | An alert shows up with the users location | Behaved as expected | Pass<br> |
| 7\. User clicks Ok on the alert | Nearest Vets and are displayed alongside the booking slots | Behaved as expected | Pass<br> |
| 8\. User inputs report information in the form fields | User can access the fields | Behaved as expected | Pass<br> |
| 9\. User presses the make booking button | booking is made | Behaved as expected | Pass<br> |
| 10\. User presses the Messages navlink | User is redirected to their message page. | Behaved as expected | Pass<br> |
| 11\. User presses show my reports button | User's reports are displayed with a communicate button | Behaved as expected | Pass<br> |
| 12\. User clicks on the communicate button | User is redirected to a chat with their an org | Behaved as expected | Pass<br> |
| 13\. User inputs a message and presses Send Message | Message is displayed for both the user and the org | Behaved as expected | Pass<br> |
| 14\. User presses the Dashboard navlink | User is redirected to their Dashboard. | Behaved as expected | Pass<br> |
| 15\. No user input | User's Profile information is displayed | Behaved as expected | Pass<br> |
| 16\. User clicks on the First Name field and changes its value | User can access the First Name field | Behaved as expected | Pass<br> |
| 17\. User clicks on Update Profile button | The value for first name changes | Behaved as expected | Pass<br> 



## 5.4 User testing

### User Testing 1 ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Tester 1 |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 23, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  We told user 1 to navigate the system |
| **Pre-requisites**  Need an account created in the app |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  User is logged in 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
User successfully navigates the system accessing different components of the system via the nav bar<br>User is successfully displayed the content of each part of the system when navigated to.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** <br>|
| 1\. User Clicks on different navbar links
| 2\. User inputs different information
| 3\. User submits various forms

 ## User feedback ## 
The user satisified with the simplicity of navigating the system and the direction take<br>However of course the user suggested a better UI


### User Testing 2 ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Tester 2 |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 23, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  We told user 1 to navigate the system |
| **Pre-requisites**  Need an account created in the app |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  User is logged in 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
User successfully navigates the system accessing different components of the system via the nav bar<br>User is successfully displayed the content of each part of the system when navigated to.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** <br>|
| 1\. User Clicks on different navbar links
| 2\. User inputs different information
| 3\. User submits various forms

 ## User feedback ## 
The user satisified with the simplicity of navigating the system and the direction take<br>
However of course the user suggested a better UI<br>
Complained about the small navigation buttons that existed on the navbar<br>


### User Testing 2 ###

| **Software Application** | Saving Animals Webapp | **Tester Name** | Tester 2 |
| ---| ---| ---| --- |
| **Release Version** | 2.2 | **Test Date** | February 23, 2024 |

| <br>**TEST INFORMATION**<br> |
| --- |
| **User Story**  We told user 2 to try register and then navigate the system |
| **Pre-requisites**  N/A |
| **Location/Server**  Saving Animals Test Server v2.2  **Dependencies**  User has access to hotspot 
| **Required Configuration**  No configuration needed |

<br>**RESULTS SUMMARY**<br>
User successfully signs up to the system creating a profile.<br>User is then granted access to the system with the ability to navigate more features.<br>

<br>**RESULT DETAILS**<br> 
 **User Input** <br>|
| 1\. User selects type of user
| 2\. User inputs username
| 3\. User inputs password
| 4\. User confirms password
| 5\. User submits information and creates account

 ## User feedback ## 
The user said it was very straight foward and easy to create an account<br>However the user felt it was too easy due to the lack of password verification when it was inputed as the only security was the password had a minimum length<br>
User was suprised that he had the ability to input any username of his choice that might be inapropriate<br>

Séanadh Ríomhphoist/Email Disclaimer
Tá an ríomhphost seo agus aon chomhad a sheoltar leis faoi rún agus is lena úsáid ag an seolaí agus sin amháin é. Is féidir tuilleadh a léamh anseo. 
This e-mail and any files transmitted with it are confidential and are intended solely for use by the addressee. Read more here. 

Séanadh Ríomhphoist/Email Disclaimer
Tá an ríomhphost seo agus aon chomhad a sheoltar leis faoi rún agus is lena úsáid ag an seolaí agus sin amháin é. Is féidir tuilleadh a léamh anseo. 
This e-mail and any files transmitted with it are confidential and are intended solely for use by the addressee. Read more here. 
Compose:
Project
MinimisePop-outClose


## **6. Installation Guide**

Step 1: git pull from repository \[https://gitlab.computing.dcu.ie/caseyj24/2024-ca326-jcasey-3rdyearproject/-/tree/main?ref_type=heads\]

Step 2: cd to code folder.

Step 3: run command \`make build\`

Step 3: run command \`make up\`

Step 4: In a separate terminal instance in the code folder run \`make
migrate\`

Step 5: Visit url of localhost:8000 in a web browser.
