# **Movies Server Node.js**
This server contains functionality and logic for processing requests for the client part for films.

## Frameworks and libraries:
- expess
- express-session
- mongoose
- connect-mongodb-session
- jsonwebtoken
- bcrypt
- jsonfile
- nodemon
- dotenv
- cors
  
## Routes  

### http://localhost:4500/auth:
- ### /registration - POST
  
    This route accepts body with user data:

    - username - **string, required, unique**
    - firname - **string, required**
    - lastname - **string, required**
    - age - **number, required**
    - address - **string, required**
    - email - **string, required, unique**
    - password - **string, required**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/registration-user-data.png)
    
    If all data types are correct and email and username are not found in the database, then the user will be added to the database, after which  will receive a message. with **status code $\color{green}{\textbf{201}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/registration-completed.png)

    If one of the fields is missing(age for example) - **status code $\color{yellow}{\textbf{400}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/registration-empty-field.png)

    If username or email already exists - **status code $\color{yellow}{\textbf{409}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/registration-email-exist.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)

  
- ### /login - POST
    
    This route accepts body with user data(email, password):

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/login-user-data.png)

    If everything went successfully - **status code $\color{green}{\textbf{200}}$**:
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/login-completed.png)
 
    If the email and password do not match in the database - **status code $\color{yellow}{\textbf{404}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/login-unknown-email-password.png)

    If email or password are empty - **status code $\color{yellow}{\textbf{400}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/login-empty-email-password.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)
    

### http://localhost:4500/users:
- ### /logout - GET

    This route allows to logout
    
    If everything went successfully - **status code $\color{green}{\textbf{200}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)

- ### /home - GET
  
    This route returns all movies found in the database

    If everything went successfully - **status code $\color{green}{\textbf{200}}$**:

    ``` json 
    [
        {
            "_id": "65ecfd3561683a8a208b3b91",
            "name": "Avengers: Endgame",
            "releaseDate": "April 26, 2019",
            "producer": "Kevin Feige",
            "duration": "3h 2m",
            "user": "65ea36f4d8c495451393a9b4"
        },
        {
            "_id": "65ef77c3d517d29cbe67bb13",
            "name": "Avengers: Age of Ultron",
            "releaseDate": "April 23, 2015",
            "producer": "Kevin Feige",
            "duration": "2h 21m",
            "user": "65ea36f4d8c495451393a9b4"
        },
        {
            "_id": "65f2003e5ff14665e55f0e73",
            "name": "The Avengers",
            "releaseDate": "May 10, 2012",
            "producer": "Kevin Feige",
            "duration": "2h 23m",
            "user": "65ea36f4d8c495451393a9b4"
        },
        {
            "_id": "65f222fc150f73903f48aa0b",
            "name": "Spider-Man",
            "releaseDate": "May 15, 2002",
            "producer": "Laura Ziskin",
            "duration": "2h 1m",
            "user": "65f2217800dca98e340e069b"
        },
        {
            "_id": "65f4be325c882f83341b3591",
            "name": "Avengers: Infinity War",
            "releaseDate": "April 27, 2018",
            "producer": "Kevin Feige",
            "duration": "dfsd",
            "user": "65ea36f4d8c495451393a9b4"
        },
        {
            "_id": "65fdab022dbfba739d5c1a3c",
            "name": "Harry Potter and the Philosopher's Stone",
            "releaseDate": "November 16, 2001",
            "producer": "Chris Columbus",
            "duration": "2h 32m",
            "user": "65fcc3b23d22da9e2a967fe7"
        }
    ]
    ```

    If token:
     - not valid
     - expired
     - dosn't exist
  
    **status code $\color{yellow}{\textbf{401}}$** 
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/token-error.png)

    If the user has spent the daily request limit - **status code $\color{yellow}{\textbf{403}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/requests-limit.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)
 

- ### /home/account/ - GET

    This route returns all movies of an authorized user found in the database

    If everything went successfully - **status code $\color{green}{\textbf{200}}$**:

    ```json
    [
        {
            "_id": "65fdab022dbfba739d5c1a3c",
            "name": "Harry Potter and the Philosopher's Stone",
            "releaseDate": "November 16, 2001",
            "producer": "Chris Columbus",
            "duration": "2h 32m",
            "user": "65fcc3b23d22da9e2a967fe7"
        }
    ] 
    ```

    If token:
     - not valid
     - expired
     - dosn't exist
  
    **status code $\color{yellow}{\textbf{401}}$** 
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/token-error.png)

    If the user has spent the daily request limit - **status code $\color{yellow}{\textbf{403}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/requests-limit.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)

- ### /home/account - POST

    This route accepts body with movie data:

    - name - **string, required,**
    - releaseDate - **string, required**
    - producer - **number, required**
    - duration - **string, required**
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-post-movie-data.png)

    If everything went successfully - **status code $\color{green}{\textbf{201}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-post-completed.png)

    If one of the fields is empty(name for example) - **status code $\color{yellow}{\textbf{400}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-post-empty.png)

    If some field does not exist in the database schema - **status code $\color{yellow}{\textbf{400}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-post-unknown-field.png)

    If token:
     - not valid
     - expired
     - dosn't exist
  
    **status code $\color{yellow}{\textbf{401}}$** 
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/token-error.png)

    If the user has spent the daily request limit - **status code $\color{yellow}{\textbf{403}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/requests-limit.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)

- ### /home/account/:id - PUT
    
    This route accepts body(one or more fields to edit information about the movie) and movie id from params:

    If everything went successfully - **status code $\color{green}{\textbf{200}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-put-completed.png)

    If updated field is empty(name for example) - **status code $\color{yellow}{\textbf{400}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-put-empty-field.png)

    If some field does not exist in the database schema - **status code $\color{yellow}{\textbf{400}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-post-unknown-field.png)

    If token:
     - not valid
     - expired
     - dosn't exist
  
    **status code $\color{yellow}{\textbf{401}}$** 
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/token-error.png)

    If the user has spent the daily request limit - **status code $\color{yellow}{\textbf{403}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/requests-limit.png)
    
    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)

- ### /home/account/:id - DELETE
    This route accepts movie id from params:

    If everything went successfully - **status code $\color{green}{\textbf{200}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/home-account-delete-completed.png)

    If token:
     - not valid
     - expired
     - dosn't exist
  
    **status code $\color{yellow}{\textbf{401}}$** 
    
    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/token-error.png)

    If the user has spent the daily request limit - **status code $\color{yellow}{\textbf{403}}$**

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/requests-limit.png)

    If error on server side - **status code $\color{red}{\textbf{500}}$**:

    ![](https://raw.githubusercontent.com/DanielUretsky/movies-server-nodejs/main/images-readme/sever-side-error.png)
  
