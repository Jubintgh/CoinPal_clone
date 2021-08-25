# Coin Pal
- Summary
    * Coin Pal is inspired by paypal based on the idea of a Peer to Peer blockchain economy. The main purpose of the app is to faciliate the transfer of crypto between the users without the need to include the wallet hash with each transaction(similar to Venmo). This is a concept app and no real Crypto is being used. The front end of this application was made with React and it follows Redux architecture. The backend was developed using Flask and PostgresSQL. The APIs are designed around REST principles. The final touch and design was also created using raw CSS.

## Checkout the website! https://coin-pal.herokuapp.com/

## Application Architecture
- Coin-pal is built using a Flask back-end and a React front-end with postgreSQL as its database. additionally redux architecture was implemented for better management of the state

## Technologies

- Flask
    * Coin Pal uses Flask for its back-end. The api files, forms and database models are built on a Flask back-end. The database models also use Flask SQLAlchemy as the object-relational mapper to interact with the postgres database.
    * Coin pal uses WTForms library to validate the forms on the backend as well as to provide the CSRF protection on sensetive forms.
- React
    * Coin pal is a React application. The front-end logic which controls the display is controlled by React libraries.
- PostgreSQL
    * Coin pal uses PostgreSQL as its database and it interacts with it via Flask-SQLAlchemy

## Features
- User Authentication / Session: 
    * User's can sign up/ log in with specific credentials and each logged in user is protected by establishing a seperate session.

- User Wallet: 
    * Each authorized User is provided with it's own Crypto wallet that includes the 3 cryptocurrencies at the time of signup

- Crypto Transactions: 
    * Each authorized User is able to send, request, cancel or reject crypto transactions that it has made to other authorized users or other users have made to it.

- Send Friend Requests: 
    * Each authorized User is able to send or recieve Friend requests to/from other authorized users
    Accept/Reject Friend requests, in addition it also has the ability to accept or reject these requests made to it or remove existing friend(contact) relationships
