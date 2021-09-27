\c plantpicker;


-- Insert user data

INSERT INTO users (username, email, pw)
VALUES 
('test1','t1@gmail.com','123'),
('test2', 't2@gmail.com', '123');


-- insert user_list 

INSERT INTO user_lists (list_name, user_id)
VALUES ('first_list', 1),
('second_list',
 2);

-- insert plants into user_list
INSERT INTO plant_list (user_list_id, plant_id)
VALUES
(1, 'peperomia'), 
(2, 'hibiscus'), 
(2, 'anthurium'), 
(1, 'philodendron');

