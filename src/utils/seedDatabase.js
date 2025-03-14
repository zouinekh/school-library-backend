const mongoose = require('mongoose');
const Book = require('../models/Book');
const Checkout = require('../models/Checkout');
const connectDB = require('../config/db');

const TOTAL_BOOKS = 100;
const TOTAL_CHECKOUTS = 200;
const STUDENT_NAMES = [
  'Emma Johnson', 'Liam Smith', 'Olivia Williams', 'Noah Brown', 'Ava Jones',
  'Sophia Miller', 'Jackson Davis', 'Isabella Garcia', 'Lucas Rodriguez', 'Mia Martinez',
  'Aiden Taylor', 'Harper Anderson', 'Ethan Thomas', 'Amelia Moore', 'Mason Jackson',
  'Evelyn White', 'Logan Harris', 'Abigail Martin', 'Carter Thompson', 'Emily Robinson'
];

const BOOK_TITLES = [
  'The Great Adventure', 'Mystery of the Lost Key', 'Science Explained', 'History of Mathematics',
  'Programming Fundamentals', 'Art Through Ages', 'World Geography', 'Chemistry Basics',
  'Physics for Beginners', 'Literature Classics', 'Modern Poetry', 'Ancient Civilizations',
  'Space Exploration', 'Human Biology', 'Environmental Science', 'World Economics',
  'Political Systems', 'Philosophy Basics', 'Psychology Principles', 'Music Theory'
];

const AUTHORS = [
  'John Smith', 'Maria Garcia', 'Robert Johnson', 'Sarah Williams', 'David Brown',
  'Jennifer Davis', 'Michael Miller', 'Elizabeth Wilson', 'James Moore', 'Patricia Taylor',
  'Richard Anderson', 'Linda Thomas', 'Charles Jackson', 'Barbara White', 'Joseph Harris',
  'Susan Martin', 'Thomas Thompson', 'Margaret Robinson', 'Christopher Lewis', 'Jessica Lee'
];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomDate = (pastDays = 365) => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * pastDays));
  return pastDate;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Dropping existing collections...');
    await Book.collection.drop();
    await Checkout.collection.drop();
    console.log('Collections dropped successfully');
    console.log('Generating books...');
    
    const booksWithIds = [];
    
    for (let i = 0; i < TOTAL_BOOKS; i++) {
      const title = `${getRandomItem(BOOK_TITLES)} ${i + 1}`;
      const author = getRandomItem(AUTHORS);
      const availableCopies = getRandomNumber(1, 10);
      
      const book = new Book({
        title,
        author,
        availableCopies
      });
      
      const savedBook = await book.save();
      booksWithIds.push(savedBook);
    }
    
    console.log(`${booksWithIds.length} books created successfully`);
    console.log('Generating checkouts...');
    const checkouts = [];
    
    for (let i = 0; i < TOTAL_CHECKOUTS; i++) {
      const randomBook = booksWithIds[Math.floor(Math.random() * booksWithIds.length)];
      const studentName = getRandomItem(STUDENT_NAMES);
      const checkoutDate = getRandomDate();
      const isReturned = Math.random() < 0.7;
      let returnDate = null;
      
      if (isReturned) {
        returnDate = new Date(checkoutDate);
        returnDate.setDate(checkoutDate.getDate() + getRandomNumber(1, 30));
      } else {
        const bookIndex = booksWithIds.findIndex(book => book._id.toString() === randomBook._id.toString());
        if (bookIndex !== -1 && booksWithIds[bookIndex].availableCopies > 0) {
          booksWithIds[bookIndex].availableCopies--;
        }
      }
      
      checkouts.push({
        studentName,
        bookId: randomBook._id,
        checkoutDate,
        returnDate
      });
    }
    
    await Checkout.insertMany(checkouts);
    console.log(`${checkouts.length} checkouts created successfully`);
    for (const book of booksWithIds) {
      await Book.findByIdAndUpdate(book._id, { availableCopies: book.availableCopies });
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();