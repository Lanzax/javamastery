import { useMeQuery } from '../lib/api';

export default function Home() {
  const hasToken = !!localStorage.getItem('token');
  const { data, error, isFetching } = useMeQuery(undefined, { skip: !hasToken });

  if (!hasToken) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="theme-panel p-6">
        {error ? (
          <div className="text-red-400">Token scaduto o non valido</div>
        ) : isFetching ? (
          <div className="theme-muted">Carico…</div>
        ) : (
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
