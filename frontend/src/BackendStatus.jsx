import { useEffect, useState } from 'react';
import api, { API_BASE_URL } from './api';


export default function BackendStatus() {
  const [state, setState] = useState('checking'); // checking | online | offline

  useEffect(() => {
    let active = true;

    console.log('%c[HEALTH] Checking backend availability…', 'color:#7c3aed;font-weight:bold');

    api
      .get('/api/health')
      .then((res) => {
        console.log('[HEALTH] Backend is online:', res.data);
        if (active) setState('online');
      })
      .catch(() => {
        console.warn(`[HEALTH] Backend unreachable at ${API_BASE_URL}. Start it with: cd backend && npm start`);
        if (active) setState('offline');
      });

    return () => {
      active = false;
    };
  }, []);

  const config = {
    checking: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', label: 'Checking backend…' },
    online: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50 border-green-200', label: `Backend online — ${API_BASE_URL}` },
    offline: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50 border-red-200', label: 'Backend offline — run: npm start in /backend' },
  }[state];

  return (
    <div className={`mt-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${config.dot} ${state === 'checking' ? 'animate-pulse' : ''}`} />
      {config.label}
    </div>
  );
}
