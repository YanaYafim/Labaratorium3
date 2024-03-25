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
  res.sendFile(path.join(__dirname, '/views/student.html'));
});

app.get('/students', (req, res) => {
  let userList = '<ul>';
  students.forEach(user => {
    userList += `<li><p>${user.fullName} - ${user.major}</p></li>`;
  });
  userList += '</ul>';
  res.send(userList);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});