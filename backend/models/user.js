"use strict";
const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate")
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

    /**Registers user with username, email, password */
    static async register(req_body) {
        const { username, email, password } = req_body;

        // Check for duplicate username
        let isDupe = await db.query(`
            SELECT username FROM users WHERE username=$1
        `, [username]);
        if(isDupe.rows.length > 0) throw new BadRequestError(`The username ${username} is already taken.`)

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
        
        return newUser.rows[0];
    }

    // /**Logs a user in given username and password */
    static async login(username, password) {

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
            throw new ExpressError("Invalid username/password!", 400);            
        }
        
    }


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

        let userQuery_id = userQuery.rows[0].id;

        const listQuery = await db.query(`
        SELECT id, list_name
        FROM user_lists
        WHERE user_id=$1
        `,[userQuery_id])


        let list = []

        if (listQuery.rows.length !== 0) {
            let plant_lists = listQuery.rows.map(l => {
                return {
                    "list_id": l.id,
                    "list_name": l.list_name
                }
            })
            
            list = plant_lists;
        }

        return {
            user,
            "plant_lists": list
        }
    }


    /**Gets all users from db with their plant lists
     * [{"username": "test1", "email": "t1@gmail.com", ...]
    */
    static async getAllUsers() {

        const res = await db.query(`
            SELECT
            id,
            username,
            email
            FROM users;
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
    
    static async getUsersPlantList(username) {
        let res = await db.query(`
            SELECT ul.id, ul.list_name, ul.user_id, u.username
            FROM user_lists ul
            LEFT JOIN users u ON u.id = ul.user_id
            WHERE username =$1
            `, [username]
        );

        if (res.rows.length === 0) {
            return null;
        }
        return res.rows;
    }
}

module.exports = User;


