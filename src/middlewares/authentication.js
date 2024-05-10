import jwt from 'jsonwebtoken';

export function authenticationMiddleware(req, res, next) {
    const authorization = req.headers.authorization
    //console.log(req.headers.authorization);

    if (!authorization) {
        return res.status(401).json({ message: 'Invalid token.' })
    }
    const [, token] = authorization.split(' ')
    if (!token) {
        return res.status(401).json({ message: 'Invalid token.' })
    }

    try {
        jwt.verify(token, 'felipe')

        const decoded = jwt.decode(token)

        req.user = decoded;
        console.log('req.user: ', req.user);

        next()
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token.' })
    }
}