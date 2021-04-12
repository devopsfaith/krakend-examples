const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const authorSchema = require('../models')
const authToken = require('../middlewares/middleware.auth')

router.post('/author/create', authToken, async (req, res) => {
	if (!mongoose.isValidObjectId(req.body.bookId)) {
		return res.status(401).json({
			status: 'CREATED_AUTHORS_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'id must be mongoid'
		})
	}

	const checkAuthor = await authorSchema.findOne({ name: req.body.authorName }).lean()

	if (checkAuthor) {
		return res.status(409).json({
			status: 'CREATED_AUTHORS_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'author name already exist'
		})
	}

	const addAuthor = await authorSchema.create({
		bookId: mongoose.mongo.ObjectId(req.body.bookId),
		name: req.body.authorName,
		state: req.body.authorState,
		country: req.body.authorCountry,
		createdAt: new Date()
	})

	if (!addAuthor) {
		return res.status(403).json({
			status: 'CREATED_AUTHORS_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'add new book failed'
		})
	}

	return res.status(201).json({
		status: 'CREATED_AUTHORS_SUCCESS',
		code: res.statusCode,
		method: req.method,
		message: 'add new book successfully'
	})
})

router.get('/author/results', authToken, async (req, res) => {
	const findAllAuthors = await authorSchema.find({}).lean()

	if (findAllAuthors.length < 1) {
		return res.status(404).json({
			status: 'FIND_ALL_AUTHORS_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'authors data is not exist',
			authors: findAllAuthors
		})
	}

	return res.status(200).json({
		status: 'FIND_ALL_AUTHORS_SUCCESS',
		code: res.statusCode,
		method: req.method,
		message: 'authors data already exist',
		authors: findAllAuthors
	})
})

router.get('/author/result/:id', authToken, async (req, res) => {
	if (!mongoose.isValidObjectId(req.body.bookId)) {
		return res.status(401).json({
			status: 'FIND_AUTHOR_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'id must be mongoid'
		})
	}

	const findAuthor = await authorSchema.findById({ _id: req.params.id }).lean()

	if (!findAuthor) {
		return res.status(404).json({
			status: 'FIND_AUTHOR_ERROR',
			code: res.statusCode,
			method: req.method,
			message: 'book data is not exist',
			author: findAuthor
		})
	}

	return res.status(200).json({
		status: 'FIND_AUTHOR_SUCCESS',
		code: res.statusCode,
		method: req.method,
		message: 'book data already exist',
		author: findAuthor
	})
})

module.exports = router
