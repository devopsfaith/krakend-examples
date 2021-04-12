const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const bookSchema = require('../models')
const authToken = require('../middlewares/middleware.auth')

router.post('/auth/login', async (req, res) => {
	if (req.body.email != 'johndoe13@gmail.com' && req.body.password != 'qwerty12') {
		return res.status(401).json({
			status: 'LOGIN_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'username or password is wrong'
		})
	}

	const accessToken = jwt.sign({ email: req.body.email }, '04b652623618fa9323c4a33970', { expiresIn: '1d' })

	return res.status(200).json({
		status: 'LOGIN_SUCCESS',
		code: res.statusCode,
		method: req.method,
		message: 'login successfully',
		accessToken
	})
})

router.post('/book/create', authToken, async (req, res) => {
	const checkBook = await bookSchema.find({ $or: [{ name: req.body.bookNamae }, { isbn: req.body.bookIsbn }] }).lean()

	if (checkBook.length > 0) {
		return res.status(409).json({
			status: 'CREATED_BOOK_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'books or isbn already exist'
		})
	}

	const addBook = await bookSchema.create({
		name: req.body.bookName,
		price: req.body.bookPrice,
		releaseDate: new Date(req.body.bookReleaseDate),
		publishDate: new Date(req.body.bookPublishDate),
		language: [...req.body.bookLanguage],
		isbn: req.body.bookIsbn,
		publisher: req.body.bookPublisher,
		createdAt: new Date()
	})

	if (!addBook) {
		return res.status(403).json({
			status: 'CREATED_BOOK_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'add new book failed'
		})
	}

	return res.status(201).json({
		status: 'CREATED_BOOK_SUCCESS',
		code: res.statusCode,
		method: req.method
	})
})

router.get('/book/results', async (req, res) => {
	console.log(req.headers)

	const findAllBooks = await bookSchema.find({}).lean()

	if (findAllBooks.length < 1) {
		return res.status(404).json({
			status: 'FIND_ALL_BOOKS_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'books data is not exist',
			books: findAllBooks
		})
	}

	return res.status(200).json({
		status: 'FIND_ALL_BOOKS_SUCCES',
		code: res.statusCode,
		method: req.method,
		message: 'books data already exist',
		books: findAllBooks
	})
})

router.get('/book/result/:id', authToken, async (req, res) => {
	const findBook = await bookSchema.findById({ _id: req.params.id }).lean()

	if (!findBook) {
		return res.status(404).json({
			status: 'FIND_BOOK_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'book data is not exist',
			books: findBook
		})
	}

	return res.status(200).json({
		status: 'FIND_BOOK_SUCCES',
		code: res.statusCode,
		method: req.method,
		message: 'book data already exist',
		book: findBook
	})
})

router.delete('/book/delete/:id', authToken, async (req, res) => {
	const findBookAndDelete = await bookSchema.findOneAndDelete({ _id: req.params.id }).lean()

	if (!findBookAndDelete) {
		return res.status(404).json({
			status: 'DELETE_BOOK_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'book data is not exist'
		})
	}

	return res.status(200).json({
		status: 'DELETE_BOOK_SUCCESS',
		code: res.statusCode,
		method: req.method,
		message: `delete one book data successfully`
	})
})

router.get('/book/update/:id', authToken, async (req, res) => {
	const findBookAndUpdate = await bookSchema
		.findOneAndUpdate(
			{ _id: req.params.id },
			{
				name: req.body.bookNamae,
				price: req.body.bookPrice,
				releaseDate: new Date(req.body.bookReleaseDate),
				publishDate: new Date(req.body.bookPublishDate),
				language: [...req.body.bookLanguage],
				isbn: req.body.bookIsbn,
				publisher: req.body.bookPublisher,
				createdAt: new Date()
			}
		)
		.lean()

	if (!findBookAndUpdate) {
		return res.status(404).json({
			status: 'UPDATE_BOOK_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'book data is not exist'
		})
	}

	return res.status(200).json({
		status: 'UPDATE_BOOK_SUCCESS',
		code: res.statusCode,
		method: req.method,
		message: `update one book data successfully`
	})
})

module.exports = router
