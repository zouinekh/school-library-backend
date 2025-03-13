const Book = require('../models/Book');
const paginationGuard = require('../utils/paginationGuard');

exports.getAllBooks = async (query) => {
    const { page, size, skip } = paginationGuard(query);
    const { search } = query;
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [data, totalItems] = await Promise.all([
      Book.find(filter).skip(skip).limit(size),
      Book.countDocuments(filter)
    ]);
  
    return {
      data,
      pagination: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / size),
        pageSize: size
      }
    };
  };

exports.createBook = async (bookData) => {
    
  const book = new Book(bookData);
   if (!book) throw new Error('Failed to add book');
    if (book.title.trim() === '' || book.author.trim() === '') {
      throw new Error('Title and author are required');
    }
  return await book.save();
};
exports.getBookById = async (bookId) => {
  return await Book.findOne({ id: bookId });
};

exports.updateBook = async (bookId, updateData) => {
  return await Book.findOneAndUpdate(
    { id: bookId },
    updateData,
    { new: true }
  );
};

exports.deleteBook = async (bookId) => {
  return await Book.findOneAndDelete({ id: bookId });
};