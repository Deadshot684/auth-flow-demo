const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- Middleware ---------------- */
app.use(cors());              
app.use(express.json());      

/**
 * Logs EVERY incoming request and its outgoing response status.
 */
app.use((req, res, next) => {
  const startedAt = Date.now();

  console.log('\n' + '='.repeat(70));
  console.log(`INCOMING  ${req.method} ${req.originalUrl}`);
  console.log(`Time      ${new Date().toISOString()}`);
  console.log(`Origin    ${req.headers.origin || 'n/a'}`);
  console.log(`Type      ${req.headers['content-type'] || 'n/a'}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('PAYLOAD RECEIVED FROM FRONTEND:');
    console.log(JSON.stringify(req.body, null, 2));
  } else {
    console.log('PAYLOAD:  (empty body)');
  }

  res.on('finish', () => {
    console.log(`OUTGOING  ${res.statusCode} ${res.statusMessage || ''} (${Date.now() - startedAt}ms)`);
    console.log('='.repeat(70));
  });

  next();
});

/* ---------------- Helpers ---------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body, { requireName = false } = {}) {
  const errors = [];
  const { name, email, password } = body || {};

  if (requireName && (!name || !String(name).trim())) errors.push('name is required');
  if (!email || !String(email).trim()) errors.push('email is required');
  else if (!EMAIL_RE.test(String(email))) errors.push('email format is invalid');
  if (!password) errors.push('password is required');
  else if (String(password).length < 6) errors.push('password must be at least 6 characters');

  return errors;
}

/* ---------------- Routes ---------------- */

// Health check — the frontend pings this on page load.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Signup
app.post('/api/signup', (req, res) => {
  const errors = validate(req.body, { requireName: true });

  if (errors.length > 0) {
    console.log('VALIDATION FAILED:', errors);
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const { name, email } = req.body;
  console.log(`SIGNUP OK for ${email}`);

  res.status(201).json({
    success: true,
    message: 'Signup successful — data received by the backend.',
    user: { name, email },            // note: password is deliberately never echoed back
    receivedAt: new Date().toISOString(),
  });
});

// Login
app.post('/api/login', (req, res) => {
  const errors = validate(req.body);

  if (errors.length > 0) {
    console.log('VALIDATION FAILED:', errors);
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const { email } = req.body;
  console.log(`LOGIN OK for ${email}`);

  res.status(200).json({
    success: true,
    message: 'Login successful — credentials received by the backend.',
    user: { email },
    token: 'demo-jwt-token-not-a-real-token',
    receivedAt: new Date().toISOString(),
  });
});

/* ---------------- 404 + error handling ---------------- */
app.use((req, res) => {
  console.log(`NO ROUTE MATCHED: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Catches malformed JSON and any thrown errors so the server never dies silently.
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: status === 400 ? 'Invalid JSON in request body' : 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log(`  Backend running on http://localhost:${PORT}`);
  console.log('  POST /api/signup   POST /api/login   GET /api/health');
  console.log('  Waiting for requests — payloads will be printed below.');
  console.log('='.repeat(70));
});
