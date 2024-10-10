# School of Computing
# CA326 Year 3 Project Proposal Form
# SECTION A
## Project Title: Save an animal worldwide
## Student 1 Name: Josh Casey   ID Number: 21361786
## Student 2 Name: Jakub Czerniejewski  ID Number: 21466494
## Staff Member Consulted: Micheal Scriney
### Description
*Save an animal worldwide is a web app designed for PC’s and smartphones
dedicated to helping abused, stray or lost animals. Users can register on
the site which allows
them to do the following depending on the type of user that is registering, a normal everyday user can register their own pet and report them as
lost, report animal abuse/a stray or lost animal and comment on other users
ongoing lost cases
to try to provide assistance where as a vet registers they will be provided additional features.
When a user reports an animal, the app calculates and displays the closest
veterinary clinics within a radius based on the user's location using geo
coordinates from a
Postgres database, the calculation will be performed in a Flask Docker
container using PostGis and an algorithm. These are sent back in order to
the front end using
websockets. The user posts it on the page where the vet clinics can take the
cases on themselves, both the user and the vet clinics can communicate using
a webchatto
exchange information.
This will all be done and held together using web sockets and RabbitMQ in a
Docker container. The app will also consist of an urgency system depending
on the animal's
condition . Most recent success stories will be available for preview. Vets
have the option to register to the site directly uploading their location
and details, this
allows them to solve cases directly. They will be faced with an inbox of
cases based on urgency submitted by different users while being able to
update the case status
and give feedback to the users.
Our project will consist of a Django Rest Framework with a React frontend to
provide a comfortable easy experience for users.*

### Division of Work
**Josh**  - Sockets, Webchat with Message Broker.
**Jakub** - Docker containers, Database Set up.
**Joint** - Django Backend, React Frontend, Survey, DjangoREST Framework.

### Programming language(s)
JavaScript, Python, PostgreSQL, Go.

### Programming tool(s)
Postgres, DjangoREST Framework, Hosted on Student Laptop using a mobile
hotspot, Flask, RabbitMQ, PostGis, React(Jsx), Gitlab, Docker, Go Compiler.

### Learning Challenges
Go, Websockets, Rabbitmq, PostGis(Location), Dockerised Microservices,
Database Syncronisation, UI Design.

### Hardware / software platform
Our development platforms are Docker and Linux(WSL), The project is a webapp
that's designed to run on phones and PC’s.

### Special hardware / software requirements
There are no special hardware/software requirements.
