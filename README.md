# Serverless TODO Application
[![Build Status](https://travis-ci.com/kursatarslan/udacity-capstone.svg?branch=master)](https://travis-ci.com/kursatarslan/udacity-capstone) ![Unit testing Backend Domain Logic](https://github.com/kursatarslan/udacity-capstone/workflows/Unit%20testing%20Backend%20Domain%20Logic/badge.svg?branch=git_action_ci) ![Deploy Master Branch to Production](https://github.com/kursatarslan/udacity-capstone/workflows/Deploy%20Master%20Branch%20to%20Production/badge.svg) [![Github license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://github.com/kursatarslan/udacity-capstone)


# Cloud Capstone Project
A simple React web app that lets you log in and rate a coffee shop.  The backend is created using the serverless framework. 

## Setup 
The backend is already deployed.  In order to connect to it, run the frontend React app locally on http://localhost:3000

### How to r un the frontend locally
* Inside the `frontend` folder, run `yarn` to install all dependancies 
* Run `yarn start`  to start the app 

The config details to connect to the backend and Auth0 are committed.   I’m leaving these in for now for the udacity reviewer.   

## Project Specification -  Rubric
### (Option 2): Functionality
* A user of the web application can use the interface to create, delete and complete an item.
	* ✅ Done with some small differences.  Users can create, delete and _update_ an item. 
* A user of the web interface can click on a “pencil” button, then select and upload a file. A file should appear in the list of items on the home page.
	* ✅ Done with some small differences.  A user can upload an image when creating a rating.  They can also click on the edit button to edit all rating details and change the image.  The image appears on the home screen. 
* If you log out from a current user and log in as a different user, the application should not show items created by the first account.
	* ✅ Done
* A user needs to authenticate in order to use an application.
	* ✅ Done

### (Option 2):Codebase
* Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.
	* ✅ Done.  The backend code is split between api, business logic and a data layer that interacts with AWS
* To get results of asynchronous operations, a student is using async/await constructs instead of passing callbacks.
	* ✅ Done

### (Option 2):Best practices
* All resources needed by an application are defined in the “serverless.yml”. A developer does not need to create them manually using AWS console.
	* ✅ Done
* Instead of defining all permissions under **provider/iamRoleStatements**, permissions are defined per function in the **functions** section of the “serverless.yml”.
	* ✅ Done
* Application has at least some of the following: 1) Distributed tracing is enabled, 2) It has a sufficient amount of log statements,  3) It generates application level metrics
	* ✅ Done.  It uses AWS X-Ray

![](https://github.com/howlin/cloud-developer-capstone/blob/master/udacity-notes/3759D618-0554-4314-90C6-78EF9D6A156D.png?s=300)

* Incoming HTTP requests are validated either in Lambda handlers or using request validation in API Gateway. The latter can be done either using the **serverless-reqvalidator-plugin** or by providing request schemas in function definitions.
	* ✅ Done.  Uses the request schemas in function definitions 

### Capstone Architecture
![Alt text](images/ServerlesssTODOAppArchitecture.png?raw=true "Architecture")

### (Option 2):Architecture
* 1:M (1 to many) relationship between users and items is modeled using a DynamoDB table that has a composite key with both partition and sort keys. Should be defined similar to this:
```
   KeySchema:
      - AttributeName: partitionKey
        KeyType: HASH
      - AttributeName: sortKey
        KeyType: RANGE
```
* ✅ Done.   I’ve used userId as the partition key.  If this was a real app I’d consider if the partition key should be a shopId.
* Items are fetched using the “query()” method and not “scan()” method (which is less efficient on large datasets)
	* ✅ Done.  

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

Click on the import button:

![Alt text](images/import-collection-1.png?raw=true "Image 1")


Click on the "Choose Files":

![Alt text](images/import-collection-2.png?raw=true "Image 2")


Select a file to import:

![Alt text](images/import-collection-3.png?raw=true "Image 3")


Right click on the imported collection to set variables for the collection:

![Alt text](images/import-collection-4.png?raw=true "Image 4")

Provide variables for the collection (similarly to how this was done in the course):

![Alt text](images/import-collection-5.png?raw=true "Image 5")

Connection Impormation

![Alt text](images/import-collection-6.png?raw=true "Image 6")

Socket.io

![Alt text](images/import-collection-7.png?raw=true "Image 7")
