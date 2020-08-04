const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const NameRoutes = express.Router();
app.use('/Name', NameRoutes);
NameRoutes.route('/').get(function(req, res) {
    Name.find(function(err, names) {
        if (err) {
            console.log(err);
        } else {
            res.json(names);
        }
    });
});

NameRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Name.findById(id, function(err, names) {
        res.json(names);
    });
});

NameRoutes.route('/add').post(function(req, res) {
    let names = new Name(req.body);
    names.save()
        .then(names => {
            res.status(200).json({'Name': 'Name added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

NameRoutes.route('/update/:id').post(function(req, res) {
    Name.findById(req.params.id, function(err, names) {
        if (!names)
            res.status(404).send("data is not found");
        else
            names.Name = req.body.Name;
            names.Length = req.body.Length;
            names.Age = req.body.Age;
            names.save().then(names => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/Name', NameRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});