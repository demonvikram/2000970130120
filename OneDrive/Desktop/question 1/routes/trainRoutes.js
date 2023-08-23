const express = require('express');
const trainController = require('../controllers/trainController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/trains', authMiddleware, trainController.getTrains);
router.get('/trains/:trainNumber', authMiddleware, trainController.getTrainByNumber);

module.exports = router;
