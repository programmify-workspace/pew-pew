const bookModel = require('../models/bookModel');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllBooks: (req, res) => {
    const books = bookModel.getAllBooks();
    res.json(books);
  },
  getBookById: (req, res) => {
    const book = bookModel.getBookById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  },
  createBook: (req, res) => {
    const newBook = { id: uuidv4(), ...req.body };
    const book = bookModel.createBook(newBook);
    res.status(201).json(book);
  },
  updateBook: (req, res) => {
    const updatedBook = bookModel.updateBook(req.params.id, req.body);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).send('Book not found');
    }
  },
  deleteBook: (req, res) => {
    const deletedBook = bookModel.deleteBook(req.params.id);
    if (deletedBook) {
      res.json(deletedBook);
    } else {
      res.status(404).send('Book not found');
    }
  }
};
