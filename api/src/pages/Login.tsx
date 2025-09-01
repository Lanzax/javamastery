import { useState } from "react";
import { useLoginMutation } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("admin@demo.it");
  const [password, setPassword] = useState("admin");
  const [login, { isLoading, error }] = useLoginMutation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch {/* handled by error */}
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Hero sinistro */}
      <div className="hidden lg:flex flex-col gap-8 p-12 relative">
        <div className="text-sm theme-muted">JavaMaster</div>
        <div className="mt-10">
          <h1 className="text-4xl font-semibold leading-tight">
            Continua il tuo percorso<br/>verso l’eccellenza in Java
          </h1>
          <p className="theme-muted mt-3 max-w-md">
            Accedi per sbloccare lezioni, quiz e progetti pratici.
          </p>
        </div>
        <div className="pointer-events-none absolute -top-16 -right-16 size-[420px] rounded-full blur-3xl"
             style={{ background: 'radial-gradient(closest-side, var(--primary), transparent 70%)', opacity: .22 }} />
      </div>

      {/* Card login */}
      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="theme-card w-full max-w-md p-8 space-y-6 rounded-2xl shadow-lg">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-center">Accedi</h2>
            <p className="theme-muted text-center text-sm">Usa le credenziali demo per iniziare</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Email</label>
            <input
              className="theme-input w-full rounded-lg px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tuo.nome@azienda.it"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Password</label>
            <input
              className="theme-input w-full rounded-lg px-3 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="text-sm text-[#ef4444]">Credenziali non valide</div>}

          <button type="submit" className="theme-btn w-full rounded-lg px-4 py-2 font-medium disabled:opacity-50" disabled={isLoading}>
            {isLoading ? "Accesso…" : "Entra"}
          </button>

          <p className="text-xs theme-muted text-center">
            Password dimenticata? <a className="theme-link" href="#">Recupera</a>
          </p>
        </form>
      </div>
    </div>
  );
}
