const express = require('express')
const bodyParser = require('body-parser')
const settings = require('./settings.json')

const app = express()

app.use(bodyParser.json())

// ? Importación rutas:
const { getUsers, createUser, editUser, deleteUser } = require("./routes/users/users")

app.get('/users', getUsers)
app.post('/users', createUser)
app.put('/users/:id', editUser)
app.delete('/users/:id', deleteUser)

const port = settings.express.app_port
console.log(port)
app.listen(port, () => {
    console.log(`[📦] ExpressJS running on port ${port}`)
})
