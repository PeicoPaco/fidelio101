const admin = require('../fb');

class Middleware {
	async decodeToken(req, res, next) {
		// console.log(req.headers);
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decodeValue = await admin.auth.verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'unauthorize' });
		} catch (e) {
			console.log(e);
			return res.json({ message: 'Internal Error' });
		}
	}
}

module.exports = new Middleware();
