'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('funcionario'); // Adiciona o estado para tipo
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Estado para mensagem de sucesso
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, tipo }), // Envia o tipo
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Espera 2 segundos antes de redirecionar
      } else {
        setError(data.message || 'Erro ao registrar');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="container">
      <h1>Registrar Usuário</h1>
      <form onSubmit={handleRegister}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>} {/* Mensagem de sucesso */}
        <input
          type="text"
          placeholder="Nome Usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Usuário"
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
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="funcionario">Funcionário</option>
          <option value="gerente">Gerente</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
      <style jsx>{`
        .container {
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
        input, select {
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
        .error {
          color: red;
          margin: 0 0 10px;
          font-size: 14px;
          text-align: center;
        }
        .success {
          color: green;
          margin: 0 0 10px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
