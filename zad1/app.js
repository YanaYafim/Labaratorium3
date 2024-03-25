const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>HOME</title>
      </head>
      <body>
        <p>HOME</p>
      </body>
    </html>
  `);
});

app.get('/student', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>STUDENT</title>
      </head>
      <body>
        <p>STUDENT</p>
      </body>
    </html>
  `);
});

app.get('/add-student', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>ADD-STUDENT</title>
      </head>
      <body>
        <p>ADD-STUDENT</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});