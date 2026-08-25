import { useState } from 'react';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from './api';
import ResultPanel from './ResultPanel';

const ENDPOINT = '/api/login';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [sent, setSent] = useState(null);
  const [received, setReceived] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email: form.email, password: form.password };

    // ---------- 1. BEFORE the request is sent ----------
    console.log('%c[LOGIN] Submit clicked — about to call the backend', 'color:#1d4ed8;font-weight:bold');
    console.log('[LOGIN] Target endpoint:', `${API_BASE_URL}${ENDPOINT}`);
    console.log('[LOGIN] Payload about to be sent:', payload);

    setStatus('loading');
    setSent(payload);
    setReceived(null);
    setError('');

    try {
      const response = await api.post(ENDPOINT, payload);

      // ---------- 2. AFTER the response is received ----------
      console.log('%c[LOGIN] Backend replied', 'color:#15803d;font-weight:bold');
      console.log('[LOGIN] HTTP status:', response.status);
      console.log('[LOGIN] Response data:', response.data);

      setReceived(response.data);
      setStatus('success');
    } catch (err) {
      const message = err.response
        ? `Backend returned ${err.response.status}: ${err.response.data?.message || err.message}`
        : `Could not reach the backend at ${API_BASE_URL}. Is it running? (cd backend && npm start)`;

      console.error('[LOGIN] Request failed:', message);
      setError(message);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
      <p className="mt-1 mb-6 text-sm text-slate-500">Log in to continue to your account.</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        No account yet?{' '}
        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          Create one
        </Link>
      </p>

      <ResultPanel status={status} sent={sent} received={received} error={error} />
    </div>
  );
}
