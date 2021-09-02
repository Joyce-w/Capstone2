DROP DATABASE plantpicker;
CREATE DATABASE plantpicker;

\c plantpicker;

DROP TABLE users,
           plants,
           user_lists,
           plant_list;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username    VARCHAR(21) NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    pw    VARCHAR(21) NOT NULL
);

CREATE TABLE plants(
   id         VARCHAR(21) NOT NULL PRIMARY KEY CHECK (id = lower(id)),
   plant_name       VARCHAR(22) NOT NULL,
   details          TEXT NOT NULL,
   lighting         INTEGER,
   kid_friendly     BOOLEAN,
   pet_friendly     BOOLEAN, 
   max_height       INTEGER, 
   flowering        BOOLEAN, 
   min_temp         INTEGER, 
   max_temp         INTEGER, 
   environment      VARCHAR(8),
   placements       VARCHAR(4),
   drought_tolerant VARCHAR(6),
   img              VARCHAR(210),
   air_purifying    BOOLEAN 
);

CREATE TABLE user_lists(
    id SERIAL PRIMARY KEY,
    list_name VARCHAR(20),
    user_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    plant_list_id SERIAL
);

CREATE TABLE plant_list(
    id SERIAL PRIMARY KEY,
    user_list_id INTEGER 
        REFERENCES user_lists ON DELETE CASCADE,
    plant_id VARCHAR(25) 
        REFERENCES plants ON DELETE CASCADE
);

