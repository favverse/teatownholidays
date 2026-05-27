module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message, dates } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

  // TODO: wire up email (Resend / SendGrid / Nodemailer) here
  console.log('Enquiry:', { name, email, message, dates });
  res.status(200).json({ success: true, message: 'Thank you. We will be in touch shortly.' });
};
