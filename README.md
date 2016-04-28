# Nodepop v. 1.0.0

## Introduction

This api is an exercise of the Keepcoding's Master Bootcamp III. The objective is to make a functional api to get info from a database that allow users to register and navigate throught the data.

This version of the API can allow you:

 - Register a new user (name, email, password)
 - Login into the API with email and password
 - Add mobile token to get push notifications.
 - List announces in the database.
 - Filter announces in the database.
 
## Setup
 
### 1.0 Getting the code

First of all, you need to have nodeJS and MongoDB installed and running in your machine.

I suppose you clone my gitHub project and install all the modules needed to run the API, if not, this is the instructions you need to enter in your terminal
 
 ```Bash
 $ git clone https://github.com/chmoncada/nodepop
 $ cd nodepop
 $ npm install
 ```
### 2.0 Before running..

After you have the app in your machine, you need to setup some things before running.

PRIMERO SI EL USUARIO QUIERE CAMBIAR LOS DATOS JSON DE ANUNCIOS Y DE USUARIO INICIAL

UNA VEZ HECHO ESTO CORRER EL SCRIPT DE INICIALIZACION DE LA BD, NO OLVIDAR ESTAR CON MONGODB CORRIENDO!!

 ```Bash
 $ npm run installDB
 ```
HECHO ESTO, YA SE ESTA LISTO PARA CORRER LA API CON EL COMANDO, COLOCAR EL PUERTO DE ESCUCHA!!
 
 ```Bash
 $ npm start
 ```
## API V1
