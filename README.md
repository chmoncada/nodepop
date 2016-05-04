# Nodepop v. 1.0.0

## Introduction

This api is an exercise of the **Keepcoding's Master Bootcamp III**. The objective is to make a functional **API** to get info from a database that allow users to register and navigate throught the data.

This version of the **API** can allow you:

 - Register a new user (name, email, password)
 - Login into the API with email and password
 - Add mobile token to get push notifications.
 - List announces in the database.
 - Filter announces in the database.
 - Check the existing tags in the database
 
## Setup
 
### 1.0 Getting the code

First of all, you need to have **nodeJS** and **MongoDB** installed and running in your machine.

I suppose you clone my gitHub project and install all the modules needed to run the **API**, if not, the instructions you need to enter in your terminal are:
 
 ```Bash
 $ git clone https://github.com/chmoncada/nodepop
 $ cd nodepop
 $ npm install
 ```
### 2.0 Before running..

After you have the app in your machine, you need to setup some things before running.

There is a file inside the *scripts* Folder called anuncios.json.  Inside it appear a first set of *announces* and an initial *user* to test the **API**.  Please change it if you want, preserving the structure and fields.

After you finished with the *JSON* file, please run the *Inicialization script*, entering in the terminal (please don´t forget to have MongoDB running): 

 ```Bash
 $ npm run installDB
 ```
With that, you are able to run the **API** , writing in your bash:
 
 ```Bash
 $ npm start
 ```
 The default listening port is *http://localhost:3000*
 
## API V1





MISSING

includeTotal filter