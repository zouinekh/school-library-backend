const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 1 * 1000, // 1 seconds
  max:  30,//this only for testing purposes 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.'
  },
  validate: { trustProxy: true } // this will make the limiter work even If request comes from reverse proxy or load balancer
});


module.exports = { apiLimiter };