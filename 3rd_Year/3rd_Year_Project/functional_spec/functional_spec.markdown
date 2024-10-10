#  Functional Specification
#  By Josh Casey & Jakub Czerniejewski

Page Content Page Number

**1. Introduction**

1.1 Overview 2

1.2 Business Context 3

1.3 Glossary 3

**2. General Description**

2.1 Product / System Functions 4

2.2 User Characteristics and Objectives 4

2.3 Operational Scenarios 5

2.4 Constraints 6

**3. Functional Requirements**

3.1 signing up 7

3.2 logging in 7

3.3 Allowing the web application to use location 8

3.4 Filling out a report 8

3.5 Submitting a report 9

3.6 Registering a pet 9

3.7 Looking for a vet/organisation 10

3.8 Choosing a vet/organisation 10

3.9 Chatting with a vet/organisation 11

3.10 vet/organisation register to the site 11

3.11 Responding to a report/vet request 12

3.12 Posting a success story 13

**4. System Architecture** 13

**5. High-Level Design**

Data Flow Diagram 14

**6. Preliminary Schedule**

Gantt Chart 15

**7. Appendices**

References 15

**1.Introduction**

**1.1 Overview**

The system is an online web application that allows users to seek
professional medical help for their pets or report stray/abused animals
on the street. On the other hand, veterinary users and other non-profit
organisations such as the ISPCA shall be able to communicate with users
who address their pets problems and also go out and provide assistance
to strays on the street.

Users reporting an issue or medical problem with their pet will be able
to pick an urgency level depending on how sick or injured their pet is
to give vets the ability to organise their patients based on the
severity level of each patient, On top of that the user will be able to
see which time slots are free for the closest vets. Users shall also be
able to submit recovery stories and images of their pet as it gets
better to provide positive feedback. If however the animal is very sick
and needs immediate attention the user can be routed to the nearest open
vet that is best suited for their animal if they choose to do so. The
need for the system is based on the fact that currently there isn\'t an
app which allows people to find all the closest vets and their schedules
all in one place while also allowing them to report abused or stay
animals.

**1.2 Business Context**

There are two main business contexts in relation to our product:

1.  The product could be deployed as a hub for multiple animal help
    organisations or veterinary clinics to advertise themselves to
    potential users who are people that want to report and help
    stray/abused/injured animals that they came across.

2.  One organisation could buy this product to use as their contact
    point with users to make their work flow more efficient and simpler.

**1.3 Glossary**

**Postgis**

PostGIS extends the capabilities of the
[[PostgreSQL]](https://postgresql.org/) relational database
by adding support for storing, indexing and querying geographic
data.

**Websocket (Socket IO)**

A websocket is a computer [[communications
protocol]](https://en.wikipedia.org/wiki/Communications_protocol),
providing [[simultaneous
two-way]](https://en.wikipedia.org/wiki/Full-duplex)
communication channels over a single [[Transmission Control
Protocol]](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
(TCP) connection. 

**Django REST**

[[Django REST
Framework]](https://www.django-rest-framework.org/) (DRF) is
a widely-used, full-featured API framework designed for building RESTful
APIs with Django. At its core, DRF integrates with Django\'s core
features \-- models, views, and URLs \-- making it simple and seamless
to create a RESTful API.

**React**

React (also known as React.js or ReactJS) is a free and open-source
front-end JavaScript library for building user interfaces based on
components.

**Rabbit MQ**

RabbitMQ is an open-source
[[message-broker]](https://en.wikipedia.org/wiki/Message_broker)
software (sometimes called [[message-oriented
middleware]](https://en.wikipedia.org/wiki/Message-oriented_middleware))


**Docker**

Docker is a set of platform as a service (PaaS) products that use
OS-level virtualization to deliver software in packages called
containers.

**Flask**

Flask is a micro web framework written in Python. It is classified as a
microframework because it does not require particular tools or
libraries.

**Session ID**

In computer science, a session identifier, session ID or session token
is a piece of data that is used in network communications (often over
HTTPS) to identify a session, a series of related message
exchanges.

## **2. General Description**

**2.1 Product / System Functions**

User functionality consists of a submission of an issue with their pet
or an issue with a stray animal accompanied by an urgency rating of how
immediate the animal needs to be seen to. This will be accessed by the
web and the user will be requested to login. Upon logging in the user
shall be prompted with the option to share their current location as
this will be needed to find routes to nearest services if needed. This
information will then be sent to a database and the user and then to a
micro service to calculate and display the nearest orgs/vets. Informing
a vet/organisation through a chat using a message broker.

-   Signing up.

-   Logging in.

-   Allowing the web app to use the current location.

-   Filling out a report.

-   Submitting the report.

-   Registering a pet.

-   Looking for a vet.

-   Calculating the nearest orgs/vets.

-   Choosing org/vet.

-   Chatting with an org/vet.

-   Vet/Org register to a site.

-   Responding to a report/vet request.

-   Posting a success story.

**2.2 User Characteristics and Objectives**

The user community can be broken down into two categories, the normal
users like people with pets and then users from a vet or organisation.

The normal users or main users of the app will be presented with a
homepage where they will have the options to file a report, look for
nearest vets and view success stories posted by vets or organisations.
These will also be able to provide their own pets names and description
in their profile. The user will be able to access the app via the mobile
phone however this can be done via laptop and the age range of the users
will be between 16-60 given their technical knowledge.

Vet users and organisations shall be able to provide their locations
into the system and be able to accept user reports and answer user
queries.

A specific example would be a normal user making a report that their pet
got critically injured and submits this report to an available vet and
this user then gets routed to the nearest available vet. The main area
of access would be via laptop of office computers

**2.3 Operational Scenarios**

Users sign up.

When a user visits the web app for the first time they will be made to
create an account. The user will have to input a username they plan on
using along with an email and a password they will remember.

User login.

A user will be prompted to log into their account using their username
and password, entering correct information leads to the user accessing
the system but entering wrong information leads to an error message
appearing denying the user access to the system.

Users approve of the use of location data.

When a user logs into the system they will be prompted with the option
for the system to use their location, on accepting this condition the
users location will be sent to a database to be used for calculating
routes to nearby vet locations.

User filling out a report.

If a user has an issue with their pet or sees an issue with an animal on
the street the user can fill out a report submitting details such as a
description, animal type and urgency.

User submitting report.

Upon completing filling out the report the user can then submit the
report sending it to a page for vets and organisations to view.

Users register a pet.

The user can then add their pet or pets to their profile providing their
names, description and age to allow for ease of use when selecting a vet
more suited.

Looking for a vet/org.

If the user\'s pet is in critical condition and needs to find a vet asap
it will have the option to be routed to the closest most suited vet.

Choosing org/vet.

This determines the closest available vet matching the severity of the
emergency and the type of animal based on those, the user can pick a
vet/org.

User chats with the vet/org.

The user can communicate with the vet to discuss their pet\'s issues or
if the vet is in current custody of the pet they can provide feedback on
its condition if it improves or declines.

Vet/Organisation registers.

Vets and Organisations will be able to register via a separate page
where they shall be able to input their schedules for given days.

Vets/Organisations respond.

Vets and organisations will be able to accept or reject requests and
queries provided on the page of the web app.

Vets/Organisations post success stories.

Vets and Organisation members will be able to post success stories onto
the web app showing the improvement of an animal\'s condition that they
have accepted to help.

**2.4 Constraints**

Below are some constraints that we may encounter during the production
of our system.

Geocoding vet offices.

As there is no easy way of translating addresses/postcodes into them
that isn\'t behind an out of reach paywall the number of coordinates may
be limited due to the time consuming procedure. To demonstrate the apps
functionality a sample of vets will be used.

Testing.

In real world scenarios as we plan to deploy it on a local network using
a hotspot and simulating scenarios for our idea are quite specific.

Efficiency

Distance and availability algorithm could not be fast enough to process
large numbers of users at a given time.

Org/Vet requirements.

We may not be able to reach organisations or vet specifications or
requirements such as security due to time constraints.

Mobile phone signal.

Poor signal while using the app will impact functionality.

GPS accuracy.

Accompanied with bad signal the gps accuracy will be less accurate with
a poor phone signal.

## **3. Functional Requirements**

**3.1 Signing up.**

*Description*

The user will have to sign up to access the service, to start the
process a user will have to press the sign up button, they will need to
provide an email address as their login, password and username. All the
users will be stored in a database alongside their information.The
system should not allow for the creation of two users with the same
email and username.

*Criticality*

The sign up function is essential to the system as without it we won\'t
be able to store individual information on each user, it also allows the
user to log into the website using their details.

*Technical Difficulties*

Our web app has to be able to tell if there exists a user with this
email address or username already. Each user is represented in the
database in the correct way ensuring that their login will work.

*Dependencies with other requirements*

This is our initial functionality so it does not have any dependencies.

**3.2 Logging in.**

*Description*

The user will have to login to access any functionality of our service,
they will need to sign up prior, to log in the user must enter the email
address and password they signed up with, once these credentials are
entered they will have to press the login button to proceed. There is be
a different login option for staff and vet/orgs admin login.

*Criticality*

The login function is critical to the system as without it the users
will not be able to access any features of our service on top of that if
the user doesn\'t login the system will not be able to store any user
specific information.

*Technical Difficulties*

Our web app has to check if the given login credentials are valid by
trying to look them up in the database, if they do we have to give them
access to our web app.

*Dependencies with other requirements*

Log in is fully dependent on 3.1 Signing up as without signing up a user
cannot log in.

**3.3 Allowing the web app to use the current location.**

*Description*

The user will have to give permission to our web application to use
their current location, a pop up will appear on the screen and the user
presses allow or deny, if deny is pressed the user will not be able to
access most of the features, if allows is pressed the geocord location
will be sent to our database.

*Criticality*

This function is critical as we need the user\'s current geocode
location to be stored in our database. If it\'s not there we cannot
display the relevant orgs/vets that are closest to the user.

*Technical Difficulties*

Our web app has to access the user's location specifically the geocords
and store them correctly in our database.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the user needs to be
logged in to access these features.

**3.4 Filling out a report.**

*Description*

The user has to press the report button after allowing/denying the
website to use his location, once the button is pressed they will be
redirected to a new page where they will be able to fill out the report,
here they specify whether the animal is abused/stray the urgency of the
report, type of animal, short description of the case and give their
location.

*Criticality*

This function is one of our main selling points which makes it highly
critical. This allows the user to post a report that any organisation
can pick and resolve.

*Technical Difficulties*

Our service has to open the correct web page, and save all the relevant
information that the user has input.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the user needs to be
logged in to access these features, and 3.3 Allowing the web app to use
the current location as the location needs to be sent as well.

**3.5 Submitting a report.**

*Description*

The user has to press the submit button, this will result in the report
being attached to their account to track the progress, a Session ID is
also generated to contact the user if more details are needed. The
report is also posted on a Dashboard for each organisation to see.

*Criticality*

This functionality is fundamental to the application.

*Technical Difficulties*

Our service has to save the data correctly in the database, make it
accessible for all the organisations and it has to give a unique session
id to the user.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login and 3.4 Filling out a
report, as the user needs to login and fill out a report.

**3.6 Registering a pet.**

*Description*

The user has to press the pets button which will bring them to a webpage
that shows them all their pets and allows them to register new ones and
delete the current ones. If a user wants to register a new pet they have
to provide their name, age, description and type of animal.

*Criticality*

This part of the system is less critical as the system can function
without it, but it\'s still used in other features.

*Technical Difficulties*

Our service has to save the data and allow the user to delete it.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the user needs to be
logged in to access their information.

**3.7 Looking for a vet/org.**

*Description*

The user can press a near me button, this will redirect them to a
webpage that displays the closest organisations or vets, the user
chooses which ones depending whether they want to seek treatment for
their own pet at the vets or report animal abuse/ stray animal directly
to the closest organisation directly. The user also chooses the max
distance away they can be. This feature is priceless during emergencies.

*Criticality*

This is an essential part of our system as its the main feature, without
it the user will not be able to find closest vets/orgs up to a specified
distance which is what our web app is all about.

*Technical Difficulties*

Our service has to calculate the distances between the user and
orgs/vets in a separate microservice flask container, each distance
being stored in a list and sorted to show the closest ones up a max
distance. After all that is done the information is displayed on the
webpage.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the user needs to be
logged in to access their information, 3.3 Allowing the web app to use
the current location as the user\'s location is used for calculations.

**3.8 Choosing a vet/org.**

*Description*

The user can specify the severity of the incident based on our rating
and they can pick the type of animal they are dealing with. Based on
their selections the list of vets/orgs will change to give the closest
and most optimal ones. If the user picks a vet they can choose which
registered pet needs that vet and write a description of what\'s wrong
with the pet. If they pick an org they have to fill out a report similar
to 3.4. Once a selection is made a unique Session ID will be attached as
well.

*Criticality*

This again a crucial part of our system as it\'s a part of the main
feature and allows the user to get even more suitable orgs/vets for
their emergency.

*Technical Difficulties*

Our service has to update the sorted list based on user selection, on
top of that if the user picks a vet they have to be able to attach their
registered pet too.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the user needs to be
logged in to access their information, 3.7 as the user needs to look for
vets/orgs first and is Partially dependent on 3.6 as they need to
register a pet before they can pass the pets information to the vet.

**3.9 Chatting with an org/vet.**

*Description*

The user can have the option to chat directly with the organisation/vet
after filing a report or choosing a vet for their pet. Each user will
have a list of reports/vet enquiries which they will be able to access
by pressing a button, they will be redirected to a new web page which
displays them and gives them the option to start a chat by pressing a
chat button or to continue an existing one.

*Criticality*

This part of our system is really important as it allows the user to
make special requests for their pets. On top of that the vets/orgs can
ask the user for further information if needed.

*Technical Difficulties*

Our service has to be able to all the reports/vet enquired made by a
user and allow them to continue an existing chat or make a new one.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the user needs to be
logged in to access their information, 3.8/3.5 as the user needs to
select a vet/org they want to enquire or submit a general report.

**3.10 Vet/Org register to a site.**

*Description*

Our login and sign up functionality will support Vet/Orgs as well. They
will need to prove that they are a registered org/vet by passing in
their company ID. Once that is done they can continue on with their
registration process in the same way as a user would but with extra
detail such as a description, what kind of animals they work with and
contact details. There will be one admin user which can change the
information about the org/vet and staff users which still use the
company ID number and their own logins/passwords.

*Criticality*

This is an essential part of our system as without it no org/vet can
join our website which makes it useless.

*Technical Difficulties*

Our service has to be able to authenticate that the company ID is valid,
it also needs to differentiate between normal users and org/vet staff.
On top of that all the information needs to be stored correctly and
displayed.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login and 3.1 Sign up as both of
these functions need to work before an org/vet can sign up.

**3.11 Responding to a report/vet request.**

*Description*

The vets/orgs will have the ability to respond to user vet
requests/reports on the website. Orgs have a list of their own reports
that users submit directly to them or they can pick and resolve some
from the Dashboard list that\'s available to all the organisations,
while vets have a list of enquiries which they can respond to and if
needed turn into appointments. Both orgs and vets have the ability to
chat with the relevant users linked to reports/appointments.

*Criticality*

This is an essential part of our web app as both orgs/vets have to be
able to respond to users, update them on the status of their enquiries
and take on reports/ vet requests.

*Technical Difficulties*

Our service has to be able to update both vet/org feeds based on the
reports/enquiries they have, they also have to be able to accept or deny
them and they need to interact with the users by chat. All of this
information needs to be stored and displayed correctly. On top of that
the Dashboard for orgs needs to update as well.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the staff member of an
org/vet needs to be logged in. 3.10 as the org/vet needs to be
registered. 3.5/3.8 as there need to be reports in the dashboard, or
direct enquiries made to vets/orgs.

**3.12 Posting success story.**

*Description*

The vets/orgs will have the ability to post a success story, once a
report/vet appointment has been resolved they will be able to update
their profile with such a story by pressing the post button.

*Criticality*

This part of our system has low criticality as it\'s an extra feature
that is not crucial to our main system functionality.

*Technical Difficulties*

Our service has to save the success story and display it on the
vets/orgs profile.

*Dependencies with other requirements*

This functionality is dependent on 3.2 Login as the staff member of an
org/vet needs to be logged in. 3.10 as the org/vet needs to be
registered.

**4. System architecture**

Our system consists of a React JSX front end that will be used to
navigate and use our service, it\'s connected to a Django REST backend
that is responsible for updating and fetching queries from the Postgres
database which will use a third party library PostGis which is used to
work with GeoCords in Postgres. On top of that a websocket server
container implemented either in Go or Flask will be present to host our
chat that\'s gonna use a RabbitMQ chat broker to allow communication
even if both the user and vet/org aren\'t online . A Flask microservice
container will be used to calculate the nearest vets/orgs to the user.

RabbitMQ and PostGis are third party software. A diagram can be seen
below.

**System architecture
diagram**![](media/image1.png)

**5. High Level Design**

*Data Flow Diagram*

Our DFD gives an overview of how data moves around our system, it also
gives an insight into the functionality of our system. Our diagram below
shows some interactions between our system components and outside
actors: users, staff and our database.^\[9\]^

![](media/image2.png)

**6. Preliminary Schedule**

*Gantt chart*

For our schedule our main priority is getting the DjangoRest api up and
running then start setting up our databases and populating it with the
coordinates. Once this begin we will be setting up our front end in
react to display our progress and data while at the same time testing
the system. After the completion of the postgis database dockerization
of flask router algorithm will begin along with connecting each
component with websockets setting up a connection to vet and user via
RabbitMQ

![](media/image3.png)

**7. Appendix**

References

1.  Postgis \[online\] available at:
    [[https://postgis.net/docs/manual-2.4/ST_Distance.html]](https://postgis.net/docs/manual-2.4/ST_Distance.html)
    \[Accessed at 27/11/2023\]

2.  RabbitMQ \[Online\] available at:
    [[https://www.rabbitmq.com/]](https://www.rabbitmq.com/)
    \[Accessed at 27/11/2023\]

3.  Websockets \[online\]available at:
    [[https://en.wikipedia.org/wiki/WebSocket]](https://en.wikipedia.org/wiki/WebSocket)
    \[Accessed at 27/11/2023\]

4.  Django REST \[online\] available at:
    [[https://testdriven.io/blog/drf-basics/]](https://testdriven.io/blog/drf-basics/)
    \[Accessed at 27/11/2023\]

5.  React JSX \[online\] available at:
    [[https://react.dev/]](https://react.dev/) \[Accessed at
    27/11/2023\]

6.  Docker \[online\] available at:
    [[https://www.docker.com/]](https://www.docker.com/)
    \[Accessed at 27/11/2023\]

7.  Session ID's \[online\] available at:
    [[https://en.wikipedia.org/wiki/Session_ID]](https://en.wikipedia.org/wiki/Session_ID)
    \[Accessed at 27/11/2023\]

8.  Flask \[online\] available at:
    [[https://flask.palletsprojects.com/en/3.0.x/]](https://flask.palletsprojects.com/en/3.0.x/)
    \[Accessed at 27/11/20\]

9.  Data flow Diagrams \[online\] available at :
    [[https://www.drawio.com/blog/data-flow-diagrams]](https://www.drawio.com/blog/data-flow-diagrams)
    \[Accessed 01/12/2023\]
