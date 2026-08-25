
export default function ResultPanel({ status, sent, received, error }) {
  if (status === 'idle') return null;

  const box = 'mt-6 rounded-lg border p-4 text-sm';
  const pre = 'mt-1 overflow-x-auto rounded bg-slate-900 p-3 font-mono text-xs text-slate-100';

  if (status === 'loading') {
    return (
      <div className={`${box} border-blue-200 bg-blue-50 text-blue-800`}>
        <p className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          Sending request to the backend…
        </p>
        <p className="mt-1 text-xs text-blue-700">Payload sent:</p>
        <pre className={pre}>{JSON.stringify(sent, null, 2)}</pre>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={`${box} border-red-200 bg-red-50 text-red-800`}>
        <p className="font-semibold">Request failed</p>
        <p className="mt-1">{error}</p>
        <p className="mt-3 text-xs font-semibold text-red-700">Payload we sent:</p>
        <pre className={pre}>{JSON.stringify(sent, null, 2)}</pre>
        <p className="mt-2 text-xs text-red-700">
          Full details are in the browser console .
        </p>
      </div>
    );
  }

  return (
    <div className={`${box} border-green-200 bg-green-50 text-green-900`}>
      <p className="font-semibold">Backend responded successfully</p>

      <p className="mt-3 text-xs font-semibold text-green-800">Payload sent to backend:</p>
      <pre className={pre}>{JSON.stringify(sent, null, 2)}</pre>

      <p className="mt-3 text-xs font-semibold text-green-800">Response received from backend:</p>
      <pre className={pre}>{JSON.stringify(received, null, 2)}</pre>

      
    </div>
  );
}
