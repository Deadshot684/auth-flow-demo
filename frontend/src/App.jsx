import { BrowserRouter, Routes, Route, NavLink, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import BackendStatus from './BackendStatus';

function NotFound() {
  return (
    <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900">404 — Page not found</h2>
      <p className="mt-2 text-sm text-slate-500">That route doesn’t exist in this app.</p>
      <Link
        to="/login"
        className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
}

export default function App() {
  const tabClass = ({ isActive }) =>
    [
      'rounded-lg px-4 py-2 text-sm font-semibold transition',
      isActive ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900',
    ].join(' ');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Auth Demo</h1>
          <p className="mt-1 text-sm text-slate-500">React + Vite + Tailwind → Express API</p>

          <BackendStatus />

          <nav className="mt-6 mb-8 flex gap-2 rounded-xl bg-slate-200/70 p-1.5">
            <NavLink to="/login" className={tabClass}>Login</NavLink>
            <NavLink to="/signup" className={tabClass}>Signup</NavLink>
          </nav>

          <Routes>
            {/* ROUTE */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
