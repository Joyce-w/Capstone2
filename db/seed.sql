\c plantpicker;


-- Insert user data

INSERT INTO users (username, email, pw)
VALUES 
('test1','t1@gmail.com','123'),
('test2', 't2@gmail.com', '123');


-- insert user_list 

INSERT INTO user_lists (list_name, user_id)
VALUES ('first_list', 1);

-- insert plants into user_list
INSERT INTO plant_list (plant_list_id, plant_id)
VALUES
(1, 'peperomia'), 
(1, 'philodendron');


-- returns username and list name and plants that each user has

-- SELECT users.username,
--        user_lists.list_name, plant_list.plant_id
-- FROM user_lists
-- JOIN users ON user_lists.user_id = users.id
-- JOIN plant_list ON plant_list.plant_list_id = user_lists.id
-- WHERE users.id = 2;


