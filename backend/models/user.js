"use strict";
const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate")
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

    // ///////*put register/authorize() in auth route eventually//// */
    /**Registers user with username, email, password */
    static async register(req_body) {
        const { username, email, password } = req_body;
        //check if all the fields are filled
        if (!username || !email || !password) {
            throw new ExpressError("Username, email, and password fields must be filled.", 400)
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        
        let newUser = await db.query(`
        INSERT INTO users
        (username, email, pw)
        VALUES ($1,$2,$3)
        RETURNING username, email;`,
            [username, email, hashedPassword])
        
        console.log('register model',newUser.rows[0])
        return newUser.rows[0];
    }

    // /**Logs a user in given username and password */
    static async login(username, password) {

        // const { username, password } = credentials;
        if (!username || !password) throw new ExpressError("Username and password required.", 404)

        let res = await db.query(`
            SELECT username, pw
            FROM users
            WHERE username = $1;
        `, [username]);


        let user = res.rows[0];
        if (user) {
            const isValid = await bcrypt.compare(password, user.pw);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        
        throw new ExpressError("Invalid username/password!", 400);


    }
    // ///////////////////////////////////



    /**Gets user based on  username
     * {"username": "test1", "email": "t1@gmail.com","list_name": "first_list"}
    */
    static async getUser(username) {
        const userQuery = await db.query(`
            SELECT id, username, email
            FROM users
            WHERE username=$1;
        `, [username])

        const user = userQuery.rows[0];
        if (!user) throw new NotFoundError(`Username '${username}' not found`)

        const listQuery = await db.query(`
        SELECT ul.id, ul.list_name
        FROM user_lists ul
        FULL JOIN  users u ON u.id = ul.user_id
        WHERE u.username = $1;
        `,[username])

        const list = listQuery.rows.map(l => {
            return {
                "list_id": l.id,
                "list_name": l.list_name
            }
        })

        return {
            user,
            "plant_lists": list
        }
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
            FULL JOIN plant_list ON plant_list.user_list_id = user_lists.id
            GROUP BY user_lists.list_name, users.username, users.email;
        `)

        return res.rows;
    }

    /**Edit and update user
     * Requires current password to make changes to username, email, password
    */
    
    static async update(username, data) {
        //check if there is a dupe Username
        const checkDupe = await db.query(`
            SELECT id, username
            FROM users
            WHERE username = $1
        `, [username]);

        //check if there is a duplicat username before changing the username!

        const { setCols, values } = sqlForPartialUpdate(data, {});
        //sets the plant id to be 1 + the values length;
        const idVarIdx = "$" + (values.length + 1);
        console.log(idVarIdx)
        const userQuery = (`
            UPDATE users
            SET ${setCols}
            WHERE username = ${idVarIdx}
            RETURNING username, email
        `);
        
        const result = await db.query(userQuery, [...values, username]);
        let user = result.rows[0];

        //check if there is existing user.
        if (!user) throw new NotFoundError(`No user found`);
        return user;
    }

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

