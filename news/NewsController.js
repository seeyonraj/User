const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const News = require('./News');



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', (req, res) => {
    res.send('its working');
});
router.get('/sports', (req, res) => {
    res.render('sports');
});
router.get('/contactus', (req, res) => {
    res.render('contactus');
});
router.get('/aboutus', (req, res) => {
    res.render('aboutus');
});
module.exports = router;