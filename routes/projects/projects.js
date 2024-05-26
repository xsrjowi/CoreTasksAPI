const mysql = require('../../database/pool')

// ? Get all projects
// TODO: Select only the ones the user is owner or on it
const getProjects = async(req, res) => {
    try {
        const [rows] = await mysql.query('SELECT * FROM Projects')
        return res.json(rows)
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}

// ? Create new project
const createProject = async(req, res) => {
    const { name, description, leader, due_date } = req.body
    try {
        const [rows] = await mysql.query(
            'INSERT INTO Projects (name, description, leader_id, due_date) VALUES (?, ?, ?, ?)',
            [name, description, leader, due_date]
        )

        return res.json({
            id: rows.id,
            name: rows.name,
            status: 200
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

// ?  Edit an existant zproject
// TODO: Guard - User has permissions
const editProject = async(req, res) => {
    const { id } = req.params
    const { name, description, leader, due_date } = req.body

    try {
        const [rows] = await mysql.query(
            'UPDATE Projects SET name = ?, description = ?, leader_id = ?, due_date = ? WHERE id = ?',
            [name, description, leader, due_date, id]
        )

        return res.json(rows, { status: 200 })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
// ? Delete an existant project
const deleteProject = async(req, res) => {
    const { id } = req.body

    const [rows] = await mysql.query(
        'DELETE FROM Projects WHERE id = ?',
        [id]
    )

    return res.json(rows, { status: 200})
}

// ? Get all projects within user is on
const getUserProjects = async(req, res) => {
    const { id } = req.body

    const [rows] = mysql.query(
        'SELECT DISTINCT Projects.* FROM Projects LEFT JOIN ProjectUsers ON Projects.id = ProjectUsers.project_id WHERE Projects.leader_id = ? OR ProjectUsers.user_id = ?;',
        [id, id]
    )
    
    return res.json(rows)
}

module.exports = { getProjects, createProject }