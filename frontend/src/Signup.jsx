import { useState } from 'react';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from './api';
import ResultPanel from './ResultPanel';

const ENDPOINT = '/api/signup';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [sent, setSent] = useState(null);
  const [received, setReceived] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name: form.name, email: form.email, password: form.password };

    // ---------- 1. BEFORE the request is sent ----------
    console.log('%c[SIGNUP] Submit clicked — about to call the backend', 'color:#1d4ed8;font-weight:bold');
    console.log('[SIGNUP] Target endpoint:', `${API_BASE_URL}${ENDPOINT}`);
    console.log('[SIGNUP] Payload about to be sent:', payload);

    setStatus('loading');
    setSent(payload);
    setReceived(null);
    setError('');

    try {
      const response = await api.post(ENDPOINT, payload);

      // ---------- 2. AFTER the response is received ----------
      console.log('%c[SIGNUP] Backend replied', 'color:#15803d;font-weight:bold');
      console.log('[SIGNUP] HTTP status:', response.status);
      console.log('[SIGNUP] Response data:', response.data);

      setReceived(response.data);
      setStatus('success');
    } catch (err) {
      const message = err.response
        ? `Backend returned ${err.response.status}: ${err.response.data?.message || err.message}`
        : `Could not reach the backend at ${API_BASE_URL}. Is it running? (cd backend && npm start)`;

      console.error('[SIGNUP] Request failed:', message);
      setError(message);
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none';

  return (
    <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
      <p className="mt-1 mb-6 text-sm text-slate-500">It only takes a few seconds.</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="signup-name" className="mb-1 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
            placeholder="Ada Lovelace"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="At least 6 characters"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-slate-500">Minimum 6 characters.</p>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          Log in
        </Link>
      </p>

      <ResultPanel status={status} sent={sent} received={received} error={error} />
    </div>
  );
}
