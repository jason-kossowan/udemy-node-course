const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = new express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString(),
        log = `${now}: ${req.method} ${req.url}`;  

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log.')
        }
    })

    next();
});

// uncomment to post a maintenance page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        header: 'The Home Page',
        welcomeMessage: 'Welcome to the home page!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        header: 'The About Page'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        header: 'The Projects Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error handling request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});