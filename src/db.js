const mysql = require("mysql")

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "goc",
    password: "gocadmin1234",
    port: 3000
})

dbConnection.connect((error) => {
    if (error) throw error;
    console.log("Connected")
})