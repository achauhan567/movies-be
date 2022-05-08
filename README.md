# movies-be

To execute this project follow the below steps:
  1. Setup mysql database 
  2. Then execute dbschema.sql present in project
  3. Test DB credentials are present in config.js
  4. execute command : "npm start" to start the project

# Endpoints for this app are:

  Movies :
  
		a. For POST: http://localhost:5000/movies/
		
		b. For GET by Id: http://localhost:5000/movies/{id}
		
		c. For GET using param : http://localhost:5000/movies/
    
		d. For PU by IdT : http://localhost:5000/movies/{id}
    
		e. For DELETE by Id: http://localhost:5000/movies/{id}
    
  Genres :

		a. For POST: http://localhost:5000/genres/
    
		b. For GET by Id: http://localhost:5000/genres/{id}
    
		c. For GET using param : http://localhost:5000/genres/
    
		d. For PU by IdT : http://localhost:5000/genres/{id}
    
		e. For DELETE by Id: http://localhost:5000/genres/{id}
 
# Payload for POST & PUT Movies:

{
"name": "MOVIE_NAME",
"director": "DIRECTOR_NAME",
"imdb_score": "6.6",
"popularity": "66.00",
"genre": [
      "GENRE_1",
      "GENRE_2",
      "GENRE_3",
      "GENRE_4"
    ]
}

# Payload for POST & PUT Genres:
{
"name": "GENRE_NAME"
}
