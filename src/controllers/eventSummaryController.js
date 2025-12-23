const {
  getEventSummary
} = require("../services/eventSummaryService");

async function getEventSummaryController(req, res) {
  try {
    const summary = await getEventSummary();
    return res.status(200).json(summary);
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    return res.status(status).json({ error: message });
  }
}

module.exports = {
  getEventSummaryController
};
