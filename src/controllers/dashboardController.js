const dashboardService = require('../services/dashboardService');

exports.getDashboard = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};