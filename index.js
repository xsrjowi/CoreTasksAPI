const express = require('express')
const bodyParser = require('body-parser')
const settings = require('./settings.json')

const app = express()

app.use(bodyParser.json())

const port = settings.express.app_port
console.log(port)
app.listen(port, () => {
    console.log(`[📦] ExpressJS running on port ${port}`)
})
