🖥️ Backend (cartella api)

Java 21 (Oracle JDK) → linguaggio principale.

Spring Boot 3.3.2 → framework principale.

Spring Security + JWT → autenticazione e autorizzazione.

Spring Data JPA + Hibernate → ORM per mappare le entità.

Flyway → migrazioni database versionate.

PostgreSQL 16 (in container) → database principale.

H2 (dev) → db in-memory per test locali.

Redis 7 (in container) → caching.

MapStruct → mapper DTO ↔ entity.

springdoc-openapi → documentazione API (Swagger UI).

JUnit 5 + Testcontainers → testing.

Maven → gestione build/dependency.

✅ Abbiamo già avviato: PostgreSQL + Redis in Docker, API con mvn spring-boot:run, autenticazione con /auth/login e /me.

🌐 Frontend (cartella app)

React 18 → libreria principale.

Vite → bundler/dev server.

TypeScript → tipizzazione.

Redux Toolkit + RTK Query → state management + integrazione API.

React Router → routing client-side.

React Hook Form + Zod → form + validazioni.

Tailwind CSS 4 + @tailwindcss/postcss → utility CSS.

Tema custom (theme.css) → palette mockup.

Inter (Google Font) → font principale.

✅ Abbiamo già: login page funzionante, collegata al backend con RTK Query, e dashboard protetta con /me.

⚙️ DevOps & Tools

Git → versionamento (già presente su macOS).

Docker Desktop → container (Postgres + Redis).

Docker Compose → orchestrazione servizi.

Homebrew → gestore pacchetti su macOS.

IntelliJ IDEA CE → IDE per backend.

VS Code → IDE per frontend.

Node.js 22 + npm → runtime JS/TS.

(non ancora messi ma in roadmap: GitHub Actions per CI, SonarQube, Micrometer → Prometheus/Grafana, log JSON).
