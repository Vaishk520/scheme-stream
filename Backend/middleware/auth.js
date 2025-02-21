const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided or Invalid Format' });
    }

    // const token = authHeader.replace('Bearer ', '');
    const token = authHeader.split(' ')[1]; // Extract token properly

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("❌ Invalid Token:", err.message);
        res.status(400).json({ message: 'Invalid Token' });
    }
};