    const router = require('express').Router();
    const authMiddleware = require('../middleware/authMiddleware');
    const User = require('../models/user');

    router.get('/get-logged-user' , authMiddleware, async(req,res)=>{
        try {
            const user = await User.findOne({_id: req.userData.userId})
            // console.log('User:', user);
            res.status(200).json({
                message: "User Logged Detail",
                success: true,
                data: user,
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: 'Internal Server Error',
                    sucess: false,
                    error: error.message
                });
        }
    })

    router.get('/get-all-user' , authMiddleware, async(req,res)=>{
        try {
            const allUser = await User.find({_id: {$ne: req.userData.userId}})
            // For Debuging I console log the user
            // console.log('User:', allUser);
            res.status(200).json({
                message: "All User Successfully",
                success: true,
                data: allUser
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: 'Internal Server Error',
                    success: false,
                    error: error.message
                });
        }
    })

    module.exports = router