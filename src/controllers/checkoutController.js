const checkoutService = require('../services/checkoutServices');

exports.getCheckouts = async (req, res) => {
    try {
      const result = await checkoutService.getAllCheckouts(req.query);
      res.json({
        data: result.data,
        pagination: result.pagination
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.addCheckout = async (req, res) => {
  try {
    const checkout = await checkoutService.createCheckout(req.body);
    res.status(201).json(checkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.returnCheckout = async (req, res) => {
  try {
    const checkout = await checkoutService.returnBook(req.params.id);
    res.json(checkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCheckoutsByBookId = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const result = await checkoutService.getCheckoutsByBookId(
      req.params.bookId,
      { page, size }
    );
    res.json({
      data: result.data,
      pagination: result.pagination
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};