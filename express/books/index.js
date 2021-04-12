require('dotenv/config')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')

const route = require('./routes')

const app = express()
const server = http.createServer(app)

mongoose.Promise = global.Promise
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		poolSize: 10
	})
	.then(() => {
		if (process.env.NODE_ENV !== 'production') {
			console.log('database is connected')
		}
	})
	.catch(() => {
		if (process.env.NODE_ENV !== 'production') {
			console.log('database not connected')
		}
	})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())
if (process.env !== 'production') {
	app.use(morgan('dev'))
}

app.enable('trust proxy')
app.disable('x-powered-by')

app.use('/api/v1', route)

server.listen(process.env.PORT, '0.0.0.0', () => {
	if (process.env.NODE_ENV !== 'production') {
		console.log('server is running on port ' + server.address().port)
	}
})
