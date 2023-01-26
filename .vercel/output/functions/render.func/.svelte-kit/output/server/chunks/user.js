import * as dotenv from "dotenv";
import "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";
import "bcrypt";
dotenv.config();
let config = {
  username: process.env.HIGHFLASH_DB_USERNAME || "admin",
  password: process.env.HIGHFLASH_DB_PASSWORD || "",
  database: process.env.HIGHFLASH_DB_DATABASE || "test",
  host: process.env.HIGHFLASH_DB_HOST || "localhost",
  dialect: process.env.HIGHFLASH_DB_DIALECT || "mysql",
  logging: false
};
const sequelize = new Sequelize(config);
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  password: DataTypes.TEXT,
  group: DataTypes.TEXT,
  status: DataTypes.TEXT,
  token: DataTypes.TEXT,
  // session token
  key: DataTypes.TEXT,
  // verification key for email verification
  reset: DataTypes.TEXT,
  // set to "pending" if pwd reset in progress
  newpassword: DataTypes.TEXT,
  // holding slot for pending new password
  expired: DataTypes.BOOLEAN
});
export {
  User as U
};
