import Comment from '../models/comment.js'; // Import the Comment model
import asyncHandler from 'express-async-handler';
import makeid from 'uniqid';

const createComment = asyncHandler(async (req, res) => {
    const { pid, content } = req.body;
    const uid = req.user.id;

    if (!pid || !content) {
        return res.status(400).json({
            err: 1,
            msg: 'Missing post ID or content',
        });
    }

    try {
        const body = { uid, ...req.body, id: makeid() };
        const response = await Comment.create(body);

        return res.status(200).json({
            success: !!response,
            msg: response ? 'Comment created successfully' : 'Failed to create comment',
            comment: response, // Optionally return the created comment
        });
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to create comment: ' + error.message,
        });
    }
});

export default {
    createComment,
};
