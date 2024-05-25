const mysql = require('mysql2')

const settings = require('../settings.json')

const pool = mysql.createPool({
    host: settings.database.db_host,
    user: settings.database.db_user,
    password: settings.database.db_password,
    database: settings.database.db_name,
    multipleStatements: settings.database.db_multipleStatements,
    connectTimeout: settings.database.db_connectTimeout
})

module.exports = pool.promise()