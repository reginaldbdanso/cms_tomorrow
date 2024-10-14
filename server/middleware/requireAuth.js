import jwt from 'jsonwebtoken';
import User from '../models/userSchema';

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    // extract the token from the header
    const token = authorization.split(' ')[1];

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(id).select('_id');
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'You must be logged in' });
    }

}

export default requireAuth;
 
