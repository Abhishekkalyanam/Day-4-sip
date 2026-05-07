const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('C:\\Users\\abhis\\OneDrive\\Documents\\Desktop\\spibackend.db', (error) => {
    if (error) {
        console.log("Error Occured")
    } else {
        console.log("Connected to DB")
    }
})

module.exports = db;

