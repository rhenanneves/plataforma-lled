'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Armazenar o token no localStorage
        localStorage.setItem('token', data.token);
        // Redirecionar para a página de cursos
        router.push('/cursos');
      } else {
        setError(data.message || 'Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <style jsx>{`
        div {
          padding: 20px;
          max-width: 400px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input {
          margin-bottom: 10px;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 16px;
          border-radius: 4px;
        }
        button:hover {
          background-color: #005bb5;
        }
        .error-message {
          color: red;
          margin: 0 0 10px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
