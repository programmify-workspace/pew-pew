const express = require('express');
const bodyParser = require('body-parser');
const bookController = require('./controllers/bookController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/books', bookController.getAllBooks);
app.get('/books/:id', bookController.getBookById);
app.post('/books', bookController.createBook);
app.put('/books/:id', bookController.updateBook);
app.delete('/books/:id', bookController.deleteBook);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
