const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
	const tokenHeader = req.headers.authorization

	if (!tokenHeader) {
		return res.status(401).json({
			status: 'UNAUTHORIZED_ACCESS',
			code: res.statusCode,
			method: req.method,
			message: 'unauthorized accessToken invalid or expired'
		})
	}

	try {
		const { email } = jwt.verify(tokenHeader.split('Bearer ')[1], '04b652623618fa9323c4a33970')
		if (email == 'johndoe13@gmail.com') {
			req.email = email
			return next()
		}
	} catch (err) {
		return res.status(403).json({
			status: 'FORBIDDEN_ACCESS',
			code: res.statusCode,
			method: req.method,
			message: 'cannot access this route'
		})
	}
}
