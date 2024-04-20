const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser);
router.get('/profile/:username', userController.getUserProfileByUsername);
router.put('/update/:username', userController.updateUserProfileByUsername);


module.exports = router;