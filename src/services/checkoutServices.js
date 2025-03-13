const Checkout = require('../models/Checkout');
const Book = require('../models/Book');
const paginationGuard = require('../utils/paginationGuard');

exports.getAllCheckouts = async (query) => {
    const { page, size, skip } = paginationGuard(query);
    const { search } = query;
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { studentName: { $regex: search, $options: 'i' } },
          { bookId: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [data, totalItems] = await Promise.all([
        Checkout.find(filter).skip(skip).limit(size),
        Checkout.countDocuments(filter)
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


exports.createCheckout = async (checkoutData) => {
    if (!checkoutData.studentName?.trim() || !checkoutData.bookId?.trim()) {
        throw new Error('Invalid checkout data - missing required fields');
    }
    console.log(checkoutData)
    const book = await Book.findOne({ id: checkoutData.bookId });
    if (!book || book.availableCopies < 1) {
        throw new Error('Book unavailable');
    }
    const checkout = new Checkout(checkoutData);
    await checkout.save();

    book.availableCopies -= 1;
    await book.save();

    return checkout;
};

exports.returnBook = async (checkoutId) => {
    const checkout = await Checkout.findByIdAndUpdate(
        checkoutId,
        { returnDate: Date.now() },
        { new: true }
    );

    if (!checkout) throw new Error('Checkout not found');

    const book = await Book.findOne({ id: checkout.bookId });
    if (book) {
        book.availableCopies += 1;
        await book.save();
    }

    return checkout;
};
exports.getCheckoutsByBookId = async (bookId, query) => {
    const { page, size, skip } = paginationGuard(query);
    
    const filter = { bookId };
    
    const [data, totalItems] = await Promise.all([
      Checkout.find(filter)
        .skip(skip)
        .limit(size)
        .sort({ checkoutDate: -1 }),
      Checkout.countDocuments(filter)
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