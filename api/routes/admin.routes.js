const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/:userid', adminController.getAdminData);

module.exports = router;
