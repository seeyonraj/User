
const app = require('./app');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9000;
const News = require('./news/News');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); 
app.set('views', './views');
let position;

app.get('/home', (req, res) => {
    News.find({}, (err, news) => {
        if (err) return res.status(500).send({ message: 'error' });
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=fddbaa90dc90e0eba13587a1323b1b0d`).then(response => {
            res.render('home', { mode: '', news, weather: response.data });
        }).catch(err => {
            res.render('home', { mode: '', news })
        });
    }).sort({ published: -1 }).limit(3);
})

const server = app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/setlocation', (req, res) => {
    position = req.body.position;
    res.status(201).json({
        redirectUrl: "http://localhost:9000/home"
    })
});
