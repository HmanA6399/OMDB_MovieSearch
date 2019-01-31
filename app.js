const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

//Root Route '/'
app.get('/', (req, res) => {
    res.render('home');
})

//Results Route '/results'
app.get('/results', (req, res) => {
    var query = req.query.q;
    request(`http://omdbapi.com/?s=${query}&apikey=thewdb`, (err, response, body) => {
    console.log(`http://omdbapi.com/?s=${query}&apikey=thewdb`);    
    if ( !err && response.statusCode == 200 ) {
            results = JSON.parse(body);
            var movies = results.Search;
            if (movies !== undefined) {
                res.render("results", {movies : movies});                
            } else {
                res.send("<h1>Nothing Found !!</h1>")
            }
        } else {
            //Error !!
        }
    });
});


//Listen
app.listen(3000, () => {
    console.log("Listening on port 3000 ....");
})