import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {

    let accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'Access token expired'
        })

        req.user = user
        next()
    })
}
export const isAdmin = (req, res, next) => {
    const { role } = req.user
    if (role !== 'R1')
        throw new Error('Require Admin Role')
    next()
}
export const isHost = (req, res, next) => {
    const { role } = req.user
    if (role !== 'R1' && role !== 'R2')
        throw new Error('Require Host Role')
    next()
}
