const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router(); //eslint-disable-line

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/convert/:language', (req, res) => {
  mainController.convertAudioToText(req, res);
});

module.exports = router;
