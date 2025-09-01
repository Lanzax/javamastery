import { useMeQuery } from '../lib/api';

export default function Home() {
  const hasToken = !!localStorage.getItem('token');
  const { data, isFetching, error, refetch } = useMeQuery(undefined, { skip: !hasToken });

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  if (!hasToken) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold">Benvenuto</h1>
        <button className="border rounded px-3 py-1" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Aggiorno…' : 'Aggiorna'}
        </button>
        <button className="border rounded px-3 py-1" onClick={logout}>Logout</button>
      </div>
      {error ? (
        <div className="text-red-600">Errore: probabilmente token scaduto</div>
      ) : (
        <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(data ?? {}, null, 2)}</pre>
      )}
    </div>
  );
}
