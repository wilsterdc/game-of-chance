const mysql = require("mysql")
const dotenv = require("dotenv")
// import mysql from "mysql"
// import dotenv from "dotenv"

dotenv.config()

const dbConnection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port
})

dbConnection.getConnection((error) => {
    if (error) throw error;
    console.log("Connected to database")    
})

// export default dbConnection