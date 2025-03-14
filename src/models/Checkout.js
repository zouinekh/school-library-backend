const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    studentName: { 
      type: String, 
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Student name must be at least 2 characters']
    },
    bookId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: [true, 'Book ID is required'],
      ref: 'Book',
      validate: {
        validator: async function(value) {
          const book = await mongoose.model('Book').findById(value);
          return book !== null;
        },
        message: 'Book with this ID does not exist'
      }
    },
    checkoutDate: { 
      type: Date, 
      required: true,
      default: Date.now,
      validate: {
        validator: function(value) {
          return value <= new Date();
        },
        message: 'Checkout date cannot be in the future'
      }
    },
  returnDate: { type: Date, default: null }
});

module.exports = mongoose.model('Checkout', CheckoutSchema);