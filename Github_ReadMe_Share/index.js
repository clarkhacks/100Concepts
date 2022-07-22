// express app
const express = require('express');
const pug = require('pug');
const axios = require('axios');
var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  });
const app = express();
const port = 3000;
// use pug
app.set('view engine', 'pug');
app.set('views', './views');
//static files
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));
// routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/:user/:repo/:branch', (req, res) => {
    //axios get contents of remote readme
    axios.get(`https://raw.githubusercontent.com/${req.params.user}/${req.params.repo}/${req.params.branch}/README.md`)
        .then(response => {
            //convert markdown data to html
            var html = md.render(response.data);
            //render readme
            res.render('readme', {
                readme: html,
                user: req.params.user,
                repo: req.params.repo
            });
        }).catch(err => {
            res.render('index', {
                error: err
            });
            console.log(err);

        });
});

// express listen
app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});