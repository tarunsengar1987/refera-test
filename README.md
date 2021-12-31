# Refera - Fullstack Code Challenge

## Acceptance criteria

- Provide clear instructions on how to run the application in development mode
	1. Create a database in mysql.

	2. Change the username, password and database name in config/config.json file.

	3. Run the below commnads in terminal from root of this project.

	npm install
	npm run frontend-install
	npx sequelize db:migrate
	npx sequelize db:seed:all
	npm run dev

- Provide clear instructions on how the application would run in a production environment
	1. Run the below command in terminal from the root of this project.

		npm run frontend-build

	2. Upload the frontend/build folder to public_html at server.

	3. Setup the node js on server and run the backend (REST API) by below command.

		npm run server

- Describe how you would implement an authentication layer for the web application (don't need to implement)
	We can use the JWT(JSON Web Token) or Passport package for authentication layer.
	https://www.npmjs.com/package/jsonwebtoken
	https://www.npmjs.com/package/passport

- RESTful API allowing CRUD and list operations on the orders
  - Endpoint to create/retrieve/update/delete order
  - Endpoint to list order

  	create: 
    	Method: POST
    	Endpoint: http://localhost:8080/api/orders
    list orders:
    	Method: GET
    	Endpoint: http://localhost:8080/api/orders
    retrive:
    	Method: GET
    	Endpoint: http://localhost:8080/api/orders/{id}
    update:
    	Method: PUT
    	Endpoint: http://localhost:8080/api/orders/{id}
    delete:
    	Method: DELETE
    	Endpoint: http://localhost:8080/api/orders/{id}
    delete all:
    	Method: DELETE
    	Endpoint: http://localhost:8080/api/orders

- RESTful API allowing CRUD operations on the categories
  - Endpoint to create/retrieve/update/delete category
  - Endpoint to list categories

  	create: 
    	Method: POST
    	Endpoint: http://localhost:8080/api/categories
    list categories:
    	Method: GET
    	Endpoint: http://localhost:8080/api/categories
    retrive:
    	Method: GET
    	Endpoint: http://localhost:8080/api/categories/{id}
    update:
    	Method: PUT
    	Endpoint: http://localhost:8080/api/categories/{id}
    delete:
    	Method: DELETE
    	Endpoint: http://localhost:8080/api/categories/{id}
    delete all:
    	Method: DELETE
    	Endpoint: http://localhost:8080/api/categories

- Database to store data from the following resources
  - Order
  - Category

  	We have migration so both resources/tables created into database by running migration.
    You just need to create the database in mysql before running the migration command.

- Describe how you would structure the database to account for 
  - Real estate agency registration data
  - Company registration data
  - Contact registration data
  - Describe what needs to be changed on the API you implemented

  	If we have the above data in our database then we need to add the foreign key of each. i.e.
    1. for real estate agency registration data - add agency_id field with foreign key and remove the agency field (textfield)
    2. for company registration data - add company_id field with foreign key and remove the company field (textfield)
    3. for contact registration data - add contact_id field with foreign key and remove the contact_name & contact_phone fields (textfield)

- One web page, following the low fidelity prototype presented on the **Resources**
  - Table with orders data, allowing the user to order the results by each column
  	=> DONE
  - Button to open modal to create new order
  	=> DONE
  - Allow row click to open modal to visualize order details
  	=> DONE

- Modal to input data to create new order
  - Form with appropriate inputs to handle each type of data
  	=> DONE
  - Allow selection of registered categories from the database
  	=> DONE
  - Save button to hit backend service and store the data
  	=> DONE

- Modal to read only the order details
	=> DONE
