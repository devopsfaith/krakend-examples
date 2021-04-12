const mongoose = require('mongoose')
const AuthorsSchema = new mongoose.Schema({
	bookId: {
		type: mongoose.Types.ObjectId,
		required: [true, 'bookId is required'],
		ref: 'books'
	},
	name: {
		type: String,
		required: [true, 'name is required']
	},
	state: {
		type: String,
		required: [true, 'state is required']
	},
	country: {
		type: String,
		required: [true, 'country is required']
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
	updateAt: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model('authors', AuthorsSchema)
