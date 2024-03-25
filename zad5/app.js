const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const currentDate = new Date().toLocaleString();
  console.log(`Request ${req.method} on path ${req.url} ${currentDate}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

let students = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/add-student', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/add-student.html'));
});

app.post('/student', (req, res) => {
  const { firstName, lastName, major } = req.body;
  const fullName = `${firstName} ${lastName}`;
  students.push({ fullName, major });
  res.redirect(`/student?fullName=${fullName}&major=${major}`);
});

app.get('/student', (req, res) => {
  const fullName = req.query.fullName;
  const major = req.query.major;
  res.render('student', { fullName, major });
});

app.get('/students', (req, res) => {
  res.render('students', { students });
});

app.delete('/student/:id', (req, res) => {
  const id = req.params.id;
  if (id < students.length) {
    students.splice(id, 1);
    res.send('Student deleted successfully.');
  } else {
    res.status(404).send('Student not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});