'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadCursos() {
  const [title, setTitle] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, descricao, preco }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Curso cadastrado com sucesso!');
        setTimeout(() => {
          router.push('/cursos'); // Redireciona para a página de listagem de cursos
        }, 2000); // Redireciona após 2 segundos para mostrar a mensagem de sucesso
      } else {
        setError(data.message || 'Erro ao cadastrar curso');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div>
      <h1>Cadastrar Curso</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <input
          type="text"
          placeholder="Título do Curso"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
