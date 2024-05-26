const mysql = require('../../database/pool')

// ? Get all database users
const getUsers = async(req, res) => {
    try {
        const [rows] = await mysql.query('SELECT * FROM Users')
        return res.json(rows)
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

// ? Create new user
// TODO: Guard - User has permissions
const createUser = async(req, res) => {
    const { name, birth_date, email, password, profile_image } = req.body
    try {
        // TODO: Validator - Ensure that req.body data is válid

        const [rows] = await mysql.query(
            'INSERT INTO Users (name, birth_date, email, password, profile_image) VALUES (?, ?, ?, ?, ?)',
            [name, birth_date, email, password, profile_image]
        )

        return res.json({ 
            id: rows.insertId,
            name: rows.name, 
            status: 200,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

// ? Edit an exisitng user
// TODO: Guard - User has permissions
const editUser = async(req, res) => {
    const { id } = req.params
    const { name, birth_date, email, password, profile_image } = req.body

    try {
        const [rows] = await mysql.query(
            'UPDATE Users SET name = ?, birth_date = ?, email = ?, password = ?, profile_image = ? WHERE id = ?',
            [name, birth_date, email, password, profile_image, id]
        )

        return res.json(rows, { status: 200 })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

// ? Delete an existing user
// TODO: Guard - User has permissions
const deleteUser = async (req, res) => {
    const { id } = req.params
    
    try {
        const [rows] = await mysql.query(
            'DELETE FROM Users WHERE id = ?',
            [id]
        )

        return res.json(rows, { 
            status: 200
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { getUsers, createUser }