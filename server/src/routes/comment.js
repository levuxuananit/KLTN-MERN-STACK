import express from 'express'
import ctrls from '../controllers/comment.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/', verifyToken, ctrls.createComment)


export default router