import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const loginStatus = (async (req, res, next) => {
    const token = req.cookies?.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password -__v');
            if (user) {
                req.user = user;
                res.locals.user = user;
            }
        } catch (err) {
            // Invalid token, do nothing
        }
    }
    next();
});


export default loginStatus; 