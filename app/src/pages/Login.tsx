import { useState } from 'react';
import { useLoginMutation } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('admin@demo.it');
  const [password, setPassword] = useState('admin');
  const [login, { isLoading, error }] = useLoginMutation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem('token', res.token);
      window.location.href = '/';
    } catch {/* handled by error */}
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border rounded p-6">
        <h1 className="text-xl font-semibold">Accedi</h1>
        <input
          className="border rounded p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="border rounded p-2 w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <div className="text-red-600 text-sm">Credenziali non valide</div>}
        <button
          className="bg-black text-white rounded px-4 py-2 w-full disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Accesso…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
