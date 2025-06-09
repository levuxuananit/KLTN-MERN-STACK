import express from 'express'
import * as authController from '../controllers/auth.js'


const router = express.Router()

router.post('/register', authController.register)
router.get('/finalregister/:email/:token', authController.finalRegister)
router.post('/login', authController.login)


export default router