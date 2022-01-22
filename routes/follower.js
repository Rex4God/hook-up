const express = require('express');

const router = express.Router();

const followerController = require('../controllers/followerController')


router.post('/followers', followerController.suggestUser)




module.exports = router