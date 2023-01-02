import * as dotenv from 'dotenv' 
dotenv.config()
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt'

const path = "data/users.sqlite";

let config = {
    username: process.env.HIGHFLASH_DB_USERNAME || "admin",
    password: process.env.HIGHFLASH_DB_PASSWORD || "",
    database: process.env.HIGHFLASH_DB_DATABASE || "test",
    host: process.env.HIGHFLASH_DB_HOST || "localhost",
    dialect: process.env.HIGHFLASH_DB_DIALECT || "mysql",
    logging: false
}

const sequelize = new Sequelize(config);

// User model
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.TEXT(100),
        unique: true
    },
    password: DataTypes.TEXT,
    group: DataTypes.TEXT,
    status: DataTypes.TEXT,
    token: DataTypes.TEXT, // session token
    key: DataTypes.TEXT, // verification key for email verification
    reset: DataTypes.TEXT, // set to "pending" if pwd reset in progress
    newpassword: DataTypes.TEXT, // holding slot for pending new password
    expired: DataTypes.BOOLEAN
});


// make sure the database exists and create table if needed.
export async function Init(drop = false) {
    const {host, username, password, database} = config;
    const connection = await mysql.createConnection({
        host:  host,
        user: username,
        password: password
    });
    const res = await connection.query('CREATE DATABASE IF NOT EXISTS ' + database);
    await User.sync();
    if(drop) {
        await User.destroy({ where: {} })
    }
    connection.end();
}

// add a user to the databse with pending status.
export async function Add(e, p) {
    const key = nanoid(6);
    await User.sync();
    let uuid = nanoid();
    const pwd = await(bcrypt.hash(p, 10));
    await User.create({
        email: e,
        token: null,
        status: "pending",
        password: pwd,
        key: key,
        reset: null,
        newpassword: null,
        group: "regular", 
        expired: false
    });
    return key;
}

// verify a user via key code
export async function Verify(e, k) {
    await User.sync();
    const user = await User.findOne({where: { email: e, key: k } });
    if(user) {
        await User.update(
            {
                status: "verified"
            },
            {
                where: { email: e, key: k }
            }
        )
        return(true)
    } else {
        return(false)
    }
}

// stage a password reset. will not finalize until confirmed.
export async function Reset(e, p) {
    await User.sync();
    const key = nanoid(6);
    const pwd = await(bcrypt.hash(p, 10));
    const user = await User.findOne({where: { email: e } });
    if(user) {
        await User.update(
            {
                reset: "pending",
                key: key,
                newpassword: pwd
            },
            {
                where: { email: e }
            }
        )
        return(key)
    } else {
        return(null)
    }
}

// confirm password reset.
export async function Confirm(e, k) {
    await User.sync();
    const user = await User.findOne({where: { email: e, key: k, reset: "pending"} });
    if(user) {
        await User.update(
            {
                reset: null,
                key: k,
                password: user.newpassword
            },
            {
                where: { email: e, reset: "pending"} 
            }
        )
        return(true)
    } else {
        return(false)
    }
}

// close the connection
export async function Close() {
    sequelize.close()
    return;
}