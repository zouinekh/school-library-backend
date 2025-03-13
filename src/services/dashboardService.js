const Book = require('../models/Book');
const Checkout = require('../models/Checkout');

exports.getDashboardStats = async () => {
  try {
    // Get book statistics
    const bookStats = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          availableBooks: { $sum: '$availableCopies' }
        }
      }
    ]);

    // Get checkout statistics
    const totalCheckouts = await Checkout.countDocuments();
    const activeCheckouts = await Checkout.countDocuments({ returnDate: null });

    return {
      totalBooks: bookStats.length > 0 ? bookStats[0].totalBooks : 0,
      availableBooks: bookStats.length > 0 ? bookStats[0].availableBooks : 0,
      totalCheckouts,
      activeCheckouts
    };
  } catch (error) {
    throw new Error(`Failed to get dashboard statistics: ${error.message}`);
  }
};