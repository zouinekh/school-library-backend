const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    studentName: { 
      type: String, 
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Student name must be at least 2 characters']
    },
    bookId: { 
      type: String, 
      required: [true, 'Book ID is required'] 
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