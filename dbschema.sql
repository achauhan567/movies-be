--Tables
-- movie (id, name, director, imdb_score, popularity)
-- genre (id, name)
-- movie_genre (movieid, genreid)

CREATE SCHEMA `movies_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

use movies_db;

CREATE TABLE `movies`
(
  `id`  INT(10) NOT NULL auto_increment ,
  `name`    VARCHAR(100) NOT NULL ,
  `director`    VARCHAR(30) NOT NULL ,
  `imdb_score`  DECIMAL(3,1) NULL ,
  `popularity`  DECIMAL(5,2) NULL ,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`  DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(100))
);


CREATE TABLE `genres`
(
  `id`  INT(2) NOT NULL auto_increment ,
  `name`    VARCHAR(20) NOT NULL ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(20))
);

insert into genres(name) values
('Adventure'),('Family'),('Fantasy'),('Musical'),('Action'),
('Sci-Fi'),('Drama'),('War'),('Horror'),('Mystery'),
('Thriller'),('Romance'),('Animation'),('Crime'),('History'),
('Western'),('Film-Noir'),('Documentary'),('Music'),('Short'),('Talk-Show'),('Biography'),
('Sport'),('News'),('Reality-TV'),('Game-Show');

CREATE TABLE `movies_genres`
(
  `movie_id`    INT(10) NOT NULL ,
  `genre_id`    INT(2) NOT NULL ,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);
