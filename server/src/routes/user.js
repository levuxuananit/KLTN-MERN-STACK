import express from 'express'
import { verifyToken, isAdmin } from '../middlewares/verifyToken.js'
import * as userController from '../controllers/user.js'
import uploadFile from '../config/cloudinary.config.js'

const router = express.Router()

router.get('/get-current', verifyToken, userController.getCurrent)
router.get('/roles', verifyToken, isAdmin, userController.getRoles)
router.post('/forgotpassword', userController.forgotPassword)
router.post('/resetpassword', userController.resetPassword)
router.get('/', verifyToken, isAdmin, userController.getUsers)
router.put('/', verifyToken, uploadFile.single('avatar'), userController.updateUser)
router.put('/:uid', verifyToken, isAdmin, userController.updateUserByAdmin)
router.delete('/:uid', verifyToken, isAdmin, userController.deleteUser)


export default router