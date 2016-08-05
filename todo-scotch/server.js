//set up  ===  ===  ===
var express = require('express');
var app = express(); // create our app w/express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console(express 4)
var bodyParser = require('body-parser'); // pull information from HTML POST(express 4)
var methodOverride = require('method-override'); // simulate DELETE & PUT (express 4)

// configuration  ===  ===  ===
//
mongoose.connect('mongodb://jjhennelly:Welcome789*@jello.modulusmongo.net:27017/E4rirypa'); // 2 mongo db database on modules.i/o

app.use(express.static(__dirname + '/public')); // set  the static files location /public/img  will be /img for use
app.use(morgan('dev')); // log every request 2 the console
app.use(bodyParser.urlencoded({'extended':'true'})); //parse  application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse  application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'})) // parse  application/vnd.api+json as  json
 app.use(methodOverride());

 // define model
 var Todo = mongoose.model('Todo', {
     text: String
 })

 // api -------------------------------------------------

// get all todos
app.get('/api/todos', function (req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. Nothing after res. send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in json format
        console.log('get is a success');
    });
});

// create todo and send back all todos  after creation
app.post('/api/todos', function (req, res) {

    // create a todo, information comes from ajax request from angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if(err) {
            res.send(err);
        }

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// delete a todo
app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id:  req.params.todo_id
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }

        // git and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});


// application ------------------------------
app.get('*', function (request, response) {
    response.sendfile('./public/index.html');  //load the single file - angular will handle page changes on the front end
});

 // listen (start app  with node server.js) ===============
 app.listen(8080);
 console.log("App listening on port 8080");
