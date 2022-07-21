// express app
const express = require('express');
const pug = require('pug');
const app = express();
const port = 3000;
// use pug
app.set('view engine', 'pug');
app.set('views','./views');
//static files
app.use(express.static('public'));
// routes
app.get('/', (req, res) => {
    res.render('index');
});
// express listen
app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});