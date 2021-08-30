DROP DATABASE plantpicker;
CREATE DATABASE plantpicker;

\c plantpicker;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username    VARCHAR(21) NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    pw    VARCHAR(21) NOT NULL
);

CREATE TABLE plants(
    id               VARCHAR(25) PRIMARY KEY CHECK (id = lower(id)),
    plant_name       VARCHAR(21) NOT NULL,
    details          TEXT NOT NULL,
    lighting         VARCHAR(19) NOT NULL,
    kid_friendly     VARCHAR(5) NOT NULL,
    pet_friendly     VARCHAR(5) NOT NULL,
    max_height       INTEGER  NOT NULL,
    flowering        VARCHAR(5) NOT NULL,
    ideal_temp       VARCHAR(6) NOT NULL,
    environment      VARCHAR(7) NOT NULL,
    ideal_positions  VARCHAR(6),
    general_shape    VARCHAR(8),
    drought_tolerant VARCHAR(6),
    img              VARCHAR(14)
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

