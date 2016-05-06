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

| Key				| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |
| nombre		 	| String	        	| user's name                |

**Optional Params**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
|lang				| String				| Change the language of error messages. "es" for Spanish, "en" for English(default)| 

**Example:**

Body Values:

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



####b)	User Authentication (POST)


**Method**: `usuarios/authenticate`

Authenticate user with email and password and get token to use in the requests

**Request URL**: `http://localhost:3000/usuarios/authenticate`

**Request Body *(x-www-form-urlencoded)*:**

| Key				| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| clave	      	| String	        	| (required) user's password |

**Optional Params**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
|lang				| String				| Change the language of error messages. "es" for Spanish, "en" for English(default)| 


**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| user@example.com	| 
| clave	      	| password        	| 


The response return a token to be attached to the API requests that needed

**Response:**

~~~json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmE5ZGFmMjU4OWQxOGMxMjkyNzAxZSIsImlhdCI6MTQ2MjQxNjk1MCwiZXhwIjoxNDYyNTg5NzUwfQ.dNf_Ia0V-SJD9reZdea5YeyGRuOXDYIGLz48IGnvcaA"
}
~~~


###2.0 Announce

####a) Announces List (GET)


**Method**: `apiv1/anuncios`

List of announces (can be filtered).  Needs token given in authenticate request (1.b)

**Request Params**

| Parameter		| Type					| Description                          |
|:------------ 	|:---------------:	| :----------------------              |
| token	      	| String			 	| (required) token. See 1.b request    |

**Request URL**: `http://localhost:3000/apiv1/anuncios?token=YOUR_TOKEN` 

Return list of announces

~~~json
{
  "success": true,
  "rows": [
    {
      "_id": "5728dcdd11dd22e504a2a677",
      "nombre": "Subaru Forester",
      "venta": true,
      "precio": 2000,
      "foto": "forester.jpg",
      "__v": 0,
      "tags": [
        "lifestyle",
        "motor"
      ]
    },
    {
      "_id": "5728dcdd11dd22e504a2a678",
      "nombre": "iPhone 3GS",
      "venta": false,
      "precio": 50,
      "foto": "iphone.png",
      "__v": 0,
      "tags": [
        "lifestyle",
        "mobile"
      ]
    }
 ]
}
~~~

**Optional Params**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| tag		      	| String			 	| tag, value can be: lifestyle, work, motor, or mobile|
| nombre	      	| String	        	| initial characters of announce name. e.g. ip to look all names that begins with "ip" |
| precio		 	| String	        	| price value:  <ul><li>Can be exact value e.g. "50"</li><li>Can be a range value e.g. "10-50"</li><li>Can be "greater than" value e.g. "50-"</li><li>Can be "lesser than" value e.g. "-50"</li></ul>|
|venta				| Boolean				| type of announce. true for sale ("venta") and false for search ("busqueda") |
|start				| Number				| Query start skipping this value. e.g. if we want that the query start after the 4 value in the DB, we put "start=4"|
|limit				| Number				| Query limit the number of announces shown |
|sort				| String				| Can be sorted by first four params|
|lang				| String				| Change the language of error messages. "es" for Spanish, "en" for English(default)| 

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| tag		      	| mobile				| 
| nombre	      	| ip		        	| 
| precio		 	| 49-		        	| 
| venta		 	| false	        	|
| start		 	| 0			        	|
| limit		 	| 2			        	|
| sort			 	| precio	        	|
| lang			 	| es		        	|

**Request URL**: 

`http://localhost:3000/apiv1/anuncios?token=YOUR_TOKEN&tag=mobile&nombre=ip&precio=49-&venta=false&start=0&limit=2&sort=precio&lang=es` 

The resuls is a JSON with the announces in an array called "rows"

**Response:**

~~~json
{
  "success": true,
  "rows": [
    {
      "_id": "5728dcdd11dd22e504a2a678",
      "nombre": "iPhone 3GS",
      "venta": false,
      "precio": 50,
      "foto": "iphone.png",
      "__v": 0,
      "tags": [
        "lifestyle",
        "mobile"
      ]
    }
  ]
}
~~~
	
####b)	Existing tags list (GET)


**Method**: `apiv1/tags`

Show a list with existing tags in the DB

**Request Params**

| Parameter		| Type					| Description                          |
|:------------ 	|:---------------:	| :----------------------              |
| token	      	| String			 	| (required) token. See 1.b request    |


**Optional Params**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
|lang				| String				| Change the language of error messages. "es" for Spanish, "en" for English(default)| 

**Request URL**: `http://localhost:3000/apiv1/tags?token=YOUR_TOKEN`

The respond JSON shows an array with the existing tags in the announces DB

**Response:**

~~~json
{
  "sucess": true,
  "tags": [
    "lifestyle",
    "motor",
    "mobile"
  ]
}
~~~


###3.0 Push Token

####a)	Saving Push Token


**Method**: `/pushtokens`

Save a token for notifications.  It can have a user email but can be empoty if you don´t want to share your email.  If you enter an existing email, it will return an error because you need to use the auth request instead (3.b).  

**Request URL**: `http://localhost:3000/pushtokens`

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| plataforma	 	| String			 	| (required) ios or android  |
| usuario	      	| String	        	| (optional) user's email    |
| pushtoken	 	| String	        	| push token                 |

**Example:**

| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| plataforma    	| ios					| 
| usuario	      	| (empty)        	| 
| nombre		 	| MY_TOKEN        	| 



**Response:**

~~~json
{
  "success": true,
  "newToken": {
    "__v": 0,
    "plataforma": "ios",
    "token": "MY_TOKEN",
    "usuario": "",
    "_id": "572bee1ec0a4556309cdf8b1"
  }
}
~~~


####b)	Saving Push Token (auth)


**Method**: `/pushtokens/auth`

Save a token for notifications for an existing user.  Be sure to use the user`s token. If a token exists, the new token overwrite it.

**Request URL**: `http://localhost:3000/pushtokens`

**Request Params**

| Parameter		| Type					| Description                          |
|:------------ 	|:---------------:	| :----------------------              |
| token	      	| String			 	| (required) token. See 1.b request    |

**Request Body *(x-www-form-urlencoded)*:**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| plataforma	 	| String			 	| (required) ios or android  |
| usuario	      	| String	        	| (optional) user's email    |
| pushtoken	 	| String	        	| push token                 |

**Optional Params**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
|lang				| String				| Change the language of error messages. "es" for Spanish, "en" for English(default)| 


**Request URL**: `http://localhost:3000/pushtokens?token=YOUR_TOKEN`

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| plataforma    	| ios					| 
| usuario	      	| user@example.com 	|
| pushtoken		| MY_TOKEN_2       	|


**Response:**

~~~json
{
  "success": true,
  "newToken": {
    "__v": 0,
    "plataforma": "ios",
    "token": "MY_TOKEN_2",
    "usuario": "user@example.com",
    "_id": "572befc82c41ca6109c6c04d"
  }
}
~~~