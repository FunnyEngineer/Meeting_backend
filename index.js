const express = require('express');
const Joi = require('joi');  //return a class
const app = express();
app.use(express.json());

app.get('/',(req, res) => {
    res.send('Hello World!');
});

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

app.get('/api/posts/:year/:month',(req, res) => {
    res.send(req.params);
    res.send(req.query);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port 5000...');
});
app.get('/api/courses/',(req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id',(req, res) => {
    let course = courses.find(
  courses => courses.id === parseInt(req.params.id)
    );
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return ;
        
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    let schema = {
        name: Joi.string().min(3).required()
        };

    let result = Joi.validate(req.body, schema);
    /* return an object that has two properties: error and value.
    Only one of them can exist.*/
    console.log(result);
    //這裡輸出result，就會知道當error時該輸出哪些錯誤訊息給用戶端↓
    //這也是Joi.js的強大與方便
    if (result.error) {
        res.status(400).send(result.error.details[0].message); 
        //把error物件中適當的property輸出，提供了反映用戶API錯誤的訊息
        // status code 400 Means bad request
        return ;
    }
    let course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(courses => courses.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return ;
    }
    let schema = {
        name: Joi.string().min(3).required()
    };
    let result = Joi.validate(req.body, schema);
    if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return ;
    }
    console.log(result); //檢查用，可不加
    course.name = result.value.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  let course = courses.find(courses => courses.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
  return ;
}
let index = courses.indexOf(course);
  /* The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.*/
  // what return is number
 
 courses.splice(index, 1);
 // This method changes the contents of an array by removing existing elements and/or adding new elements.
 res.send(course); //傳給client端
});

function validateCourse(course) {
    let schema = {
      name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
