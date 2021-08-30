"use strict";
const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");

class User {

    // ///////*put register/authorize() in auth route eventually//// */
    /**Registers user with username, email, password */
    static async register(req_body) {
        const { username, email, password } = req_body;
        console.log(username, email, password)

        let newUser = await db.query(`
        INSERT INTO users
        (username, email, pw)
        VALUES ($1,$2,$3)
        RETURNING username, email;`,
            [username, email, password])
        
        
        return newUser.rows[0];
    }

    // /**Logs a user in given username and password */
    // static async authorize()
    // ///////////////////////////////////



    /**Gets user based on  username
     * {"username": "test1", "email": "t1@gmail.com","list_name": "first_list"}
    */
    static async getUser(username) {
        console.log('username', username)
        const res = await db.query(`
        SELECT
        users.username,
        users.email,
        user_lists.list_name
        FROM user_lists
        FULL JOIN users ON user_lists.user_id = users.id
        FULL JOIN plant_list ON plant_list.plant_list_id = user_lists.id
        WHERE users.username = $1
        GROUP BY user_lists.list_name, users.username, users.email;`
        , [username])
        
        return(res.rows[0])
    }

    /**Gets all users from db with their plant lists
     * [{"username": "test1", "email": "t1@gmail.com","list_name": "first_list"},
        ...]
    */
    static async getAllUsers() {

        const res = await db.query(`
            SELECT
            users.username,
            users.email,
            user_lists.list_name
            FROM user_lists
            FULL JOIN users ON user_lists.user_id = users.id
            FULL JOIN plant_list ON plant_list.plant_list_id = user_lists.id
            GROUP BY user_lists.list_name, users.username, users.email;
        `)

        return res.rows;
    }

    /**Edit and update user
     * Requires current password to make changes to username, email, password
    */
    // static async update()

    /**Remove users */
    static async remove(username) {
        //Check if password is correct
        console.log('username', username)
        //if correct delete from db
        let res = await db.query(`
        DELETE FROM users
        WHERE username = $1
        RETURNING username;
        `, [username]);

        // Check if there is an id to be deleted
        if (res.rows.length === 0) {
            throw new ExpressError("User cannot be found", 404);
        }
    }
    
}

module.exports = User;

