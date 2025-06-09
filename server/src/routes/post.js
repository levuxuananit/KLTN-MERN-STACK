import express from 'express'
import * as postController from '../controllers/post.js'
import { verifyToken, isHost, isAdmin } from '../middlewares/verifyToken.js'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/one', postController.getPostById)
router.get('/new-post', postController.getNewPosts)
router.post('/report',verifyToken,   postController.reportPost)
router.put('/expired', verifyToken, isAdmin, postController.plusExpired)
router.get('/get-exp', verifyToken, isAdmin, postController.getExpireds)
router.put('/plus', verifyToken, isAdmin, postController.plusExpired)
router.get('/get-rp', verifyToken, postController.getReports)
router.get('/get-rp-admin', verifyToken, postController.getReportsAdmin)
router.put('/update-rp', verifyToken, isAdmin, postController.updateReport)
router.delete('/remove-rp', verifyToken, isAdmin, postController.deleteReport)
router.get('/dashboard', verifyToken, isAdmin, postController.getDashboard)

router.use(verifyToken)
router.post('/ratings', postController.ratings)
router.put('/seen-rp', postController.seenReport)
router.post('/wishlist', postController.updateWishlist)
router.get('/wishlist', postController.getWishlist)
router.use(isHost)
router.put('/update-rp/host', postController.plusExpiredPaypal)
router.post('/create-new', postController.createNewPost)
router.post('/request-expired', postController.requestExpired)
router.get('/limit-admin', postController.getPostsLimitAdmin)
router.put('/update', postController.updatePost)
router.delete('/delete', postController.deletePost)
router.put('/rented/:pid', postController.updatePostRented)



export default router