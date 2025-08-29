const { processPayload, getContext } = require('../lib/logic');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ is_success: false, error: 'Method Not Allowed. Use POST.' });
  }
  try {
    const body = req.body || {};
    const { data } = body;
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid payload. Expected JSON with a 'data' array."
      });
    }
    const ctx = getContext();
    const result = processPayload(data, ctx);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
};
