const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set( 'view engine', 'hbs' );

/** Middleware **/
app.use( (req, res, next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if( err ) console.log('Unable to append to server.log');
    } );

    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//     });
// });

app.use( express.static(__dirname + '/public') );

/** Helpers **/
hbs.registerHelper( 'getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper( 'screamIt', (text) => {
    return text.toUpperCase();
});

/** Routing **/
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome Home ;)'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Uh oh something bad happened'
    });
});

/** Start server **/
app.listen(3000, () => {
    console.log('Server is up on port 3000');
} );
