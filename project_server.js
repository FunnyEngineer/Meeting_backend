const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { string } = require('joi');

const Data = require('./report_data');
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

var Schema = mongoose.Schema;
var Meeting_data_schema = new Schema({
    id: Number,
    date: String,
    title: String,
    content: String,
    BIM_report_list: [Schema.Types.ObjectId]
});

const Meeting_data = mongoose.model('Meeting_data', Meeting_data_schema);

var report_data_schema = new mongoose.Schema({
    user: String,
    date: String,
    mode: String,
    ele_id: Number,
    param: String
});

const report_data = mongoose.model('report_data', report_data_schema);
const router = express.Router();

router.route('/putData').post(function(req, res) {
    let data = new Meeting_data();

    const { id, dict } = req.body;
  
    if ((!id && id !== 0) || !dict) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS',
      });
    }
    data.id = id;
    data.date = dict.date;
    data.content = dict.content;
    data.title = dict.title;
    data.save()
        .then(data => {
            console.log("Server added a new data");
            res.status(200).json({'success': 'data added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/backend', router);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});