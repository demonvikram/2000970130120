const Train = require('../models/trainModel');

async function getTrains(req, res) {
  try {
    const currentTime = new Date();
    const next12Hours = new Date();
    next12Hours.setHours(currentTime.getHours() + 12);

    const filteredTrains = await Train.find({
      departureTime: {
        $gt: currentTime,
        $lte: next12Hours,
      },
    }).sort({ 
      'price.AC': 1,
      'seatsAvailable.sleeper': -1,
      'departureTime': -1,
    });

    res.status(200).json(filteredTrains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch train details' });
  }
}

async function getTrainByNumber(req, res) {
    try {
      const trainNumber = req.params.trainNumber;
  
      const train = await Train.findOne({ trainNumber });
  
      if (!train) {
        return res.status(404).json({ error: 'Train not found' });
      }
  
      res.status(200).json(train);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch train details' });
    }
  }
  
  module.exports = {
    getTrains,
    getTrainByNumber,
  };
