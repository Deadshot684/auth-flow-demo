import axios from 'axios';

/**
 * Single source of truth for the backend URL.
 * Change it here (or in frontend/.env as VITE_API_URL) and every request follows.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/* Console styling so the logs stand out in DevTools */
const style = {
  send: 'background:#1d4ed8;color:#fff;font-weight:bold;padding:2px 6px;border-radius:3px',
  ok: 'background:#15803d;color:#fff;font-weight:bold;padding:2px 6px;border-radius:3px',
  err: 'background:#b91c1c;color:#fff;font-weight:bold;padding:2px 6px;border-radius:3px',
};

/* ---------- INTERCEPTOR 1: runs BEFORE the request leaves the browser ---------- */
api.interceptors.request.use(
  (config) => {
    config.metadata = { startedAt: performance.now() };

    console.group(
      `%c OUTGOING REQUEST %c ${config.method.toUpperCase()} ${config.baseURL}${config.url}`,
      style.send,
      'color:#1d4ed8;font-weight:bold',
    );
    console.log('Endpoint :', `${config.baseURL}${config.url}`);
    console.log('Method   :', config.method.toUpperCase());
    console.log('Headers  :', config.headers);
    console.log('PAYLOAD SENT TO BACKEND ↓');
    console.table(config.data);          // readable table of the exact payload
    console.log('Raw JSON :', JSON.stringify(config.data, null, 2));
    console.groupEnd();

    return config;
  },
  (error) => {
    console.error('%c REQUEST FAILED TO SEND ', style.err, error);
    return Promise.reject(error);
  },
);

/* ---------- INTERCEPTOR 2: runs AFTER the response comes back ---------- */
api.interceptors.response.use(
  (response) => {
    const ms = Math.round(performance.now() - response.config.metadata.startedAt);

    console.group(
      `%c RESPONSE RECEIVED %c ${response.status} ${response.statusText} • ${ms}ms`,
      style.ok,
      'color:#15803d;font-weight:bold',
    );
    console.log('Status      :', response.status, response.statusText);
    console.log('Round trip  :', `${ms}ms`);
    console.log('Headers     :', response.headers);
    console.log('DATA FROM BACKEND ↓');
    console.table(response.data);
    console.log('Raw JSON    :', JSON.stringify(response.data, null, 2));
    console.groupEnd();

    return response;
  },
  (error) => {
    const ms = error.config?.metadata
      ? Math.round(performance.now() - error.config.metadata.startedAt)
      : null;

    console.group(`%c REQUEST FAILED %c ${error.message}`, style.err, 'color:#b91c1c;font-weight:bold');
    if (ms !== null) console.log('Elapsed :', `${ms}ms`);

    if (error.response) {
      // Backend answered, but with an error status (400, 401, 500...)
      console.log('Status  :', error.response.status, error.response.statusText);
      console.log('ERROR BODY FROM BACKEND ↓');
      console.table(error.response.data);
      console.log('Raw JSON:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // No answer at all — almost always "the backend isn't running"
      console.log('No response received. The request was sent but nothing came back.');
      console.log(`Is the backend running on ${API_BASE_URL} ?  ->  cd backend && npm start`);
    }
    console.groupEnd();

    return Promise.reject(error);
  },
);

export default api;
