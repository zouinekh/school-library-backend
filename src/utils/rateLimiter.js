const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 15,//this only for testing purposes 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.'
  },
  validate: { trustProxy: true } // this will make the limiter work even If request comes from reverse proxy or load balancer
});


module.exports = { apiLimiter };