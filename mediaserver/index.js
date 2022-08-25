const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { v4: uuid } = require('uuid')
const path = require('path')
app = express()

const PORT = 5000
const BASE_URL = `http://localhost:${PORT}`

app.use(cors())
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
}))

app.post('/images', (req, res) => {
	try {
		const image = req.files.image
		const name = image.name
		const ext = name.slice(name.lastIndexOf('.'))
		const id = uuid() + ext
		image.mv(path.join(__dirname, 'images', id)).then(() => {
			res.json({
				url: `${BASE_URL}/images/${id}`
			})
		})
	} catch (error) {
		res.json({
			error: "Cannot upload the file"
		})
	}
})

app.post('/videos', (req, res) => {
	try {
		const video = req.files.video
		const name = video.name
		const ext = name.slice(name.lastIndexOf('.'))
		const id = uuid() + ext
		video.mv(path.join(__dirname, 'videos', id)).then(() => {
			res.json({
				url: `${BASE_URL}/videos/${id}`
			})
		})
	} catch (error) {
		res.json({
			error: "Cannot upload the file",
			payload: error
		})
	}
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/videos', express.static(path.join(__dirname, 'videos')))

app.listen(PORT, () => console.log('File server started.'))