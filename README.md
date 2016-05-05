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

There is a file inside the *scripts* Folder called anuncios.json.  Inside it appear a first set of *announces* and an initial *user* `admin@me.com` and password `1234` to test the **API**.  Please change it if you want, preserving the structure and fields.

After you finished with the *JSON* file, run the *Inicialization script*, entering in the terminal (please don´t forget to have MongoDB running): 

 ```Bash
 $ npm run installDB
 ```
With that, you are able to run the **API** , writing in your bash:
 
 ```Bash
 $ npm start
 ```
 The default listening port is *http://localhost:3000*
 
## API V1

This API returns JSON object for the requests the user make. The possible petitions are:

###1.0 User

####a)	User Register (POST)

**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~



####b)	Autentificacion


**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~


###2.0 Metodos de Anuncios

####a) Lista de anuncios y filtros


**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~


- por tag
	- por tipo
	- por rango
		*	exacto
		* mayor que
		* menor que
		* rango
	- nombre
	
####b)	Lista de tags existentes


**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~


###3.0 Metodos de Token

####a)	Guardado de token push


**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~


####b)	Guardado de token push (auth)


**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~


###4.0 Utilidades

####a) Internacionalizacion de mensajes de error


**Method**: `usuarios/register`

Register a new user

**Request URL**: `http://localhost:3000/usuarios/register`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 
| nombre		 	| usuario	        	| 

The "clave" field is saved encrypted for security reasons.

**Response:**

~~~json
{
  "success": true,
  "newUser": {
    "__v": 0,
    "nombre": "usuario",
    "email": "user@example.com",
    "clave": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "_id": "572a9daf2589d18c1292701e"
  }
}
~~~

		





MISSING

includeTotal filter