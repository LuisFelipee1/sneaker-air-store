export function adminCheckMiddleware(req, res, next) {
    if (req.user.admin) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized.' });
}