const mongoose = require('mongoose')
const BooksSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: [true, 'name must be a unique'],
		required: [true, 'name is required']
	},
	price: {
		type: Number,
		required: [true, 'price is required']
	},
	releaseDate: {
		type: Date,
		required: [true, 'releaseDate is required']
	},
	publishDate: {
		type: Date,
		required: [true, 'publishDate is required']
	},
	language: {
		type: Array,
		required: [true, 'language is required']
	},
	isbn: {
		type: Number,
		unique: [true, 'isbn must be a unique'],
		required: [true, 'isbn is required']
	},
	publisher: {
		type: String,
		trim: true,
		required: [true, 'publisher is required']
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

module.exports = mongoose.model('books', BooksSchema)
