// Create web server
// -----------------

// Imports
const express = require('express');
const router = express.Router();
const {Comment} = require('../models/comments');

// Create Comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            userId: req.body.userId,
            postId: req.body.postId,
            comment: req.body.comment
        })
        await comment.save();
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Get comments of a post
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.postId});
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Update comment
router.put('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findOneAndUpdate({_id: req.params.commentId}, {
            $set: {
                comment: req.body.comment
            }
        }, {new: true});
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Delete comment
router.delete('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({_id: req.params.commentId});
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Export
module.exports = router;
