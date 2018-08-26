const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware:

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to file.');
        }
    });
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

// helpers:

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


// manage requests:

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'This is the home page!',
        welcomeMessage: `Welcome to the home page.`
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: '- About page -'
    });
})

app.get('/help', (req, res) => {
    res.render('help.hb', {
        pageTitle: '- About page -'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        status: 'BAD_URL',
        errorCode: '000'
    })
})

app.listen(3000, () => {
    console.log(`Server is up on port 3000`);
});