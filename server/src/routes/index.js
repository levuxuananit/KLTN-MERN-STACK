import authRouter from './auth.js'
import insertRouter from './insert.js'
import categoryRouter from './category.js'
import postRouter from './post.js'
import priceRouter from './price.js'
import areaRouter from './area.js'
import provinceRouter from './province.js'
import userRouter from './user.js'
import comment from './comment.js'
import { notFound, errorHandler } from '../middlewares/errHandler.js'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/insert', insertRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/price', priceRouter)
    app.use('/api/v1/area', areaRouter)
    app.use('/api/v1/province', provinceRouter)
    app.use('/api/v1/comment', comment)
    app.use('/api/v1/user', userRouter)

    app.use(notFound)
    app.use(errorHandler)

}

export default initRoutes