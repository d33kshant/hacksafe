const express = require('express')
const cors = require('cors')
const plagcheck = require('./plagcheck')

const PORT = 8000

const app = express()
app.use(express.json())
app.use(cors())

app.post('/', plagcheck)

app.listen(PORT, () => {
	console.log('Plagiarism checker listenin on port:', PORT)
})