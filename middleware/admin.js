module.exports = function (req, res, next) {

    if (!req.user.isAdmin) {
        return res.status(403).send('Murojat rad etildi siz admin emassiz');
    }
    next()

}