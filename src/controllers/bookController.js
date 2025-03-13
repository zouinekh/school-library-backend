const bookService = require('../services/bookService');

exports.getBooks = async (req, res) => {
    try {
      const result = await bookService.getAllBooks(req.query);
      res.json({
        data: result.data,
        pagination: result.pagination
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getBookById = async (req, res) => {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.addBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
   
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};