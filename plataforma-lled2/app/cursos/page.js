'use client';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="container">
        <div className="section" onClick={() => handleNavigate('/cadCursos')}>
          <h2>Cadastrar Cursos</h2>
        </div>

        <div className="section" onClick={() => handleNavigate('/gerenciar-usuarios')}>
          <h2>Gerenciar Usuários</h2>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
        }
        .container {
          display: flex;
          justify-content: space-between;
        }
        .section {
          flex: 1;
          margin-right: 20px;
          padding: 20px;
          background-color: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .section:hover {
          background-color: #e0e0e0;
        }
        .section:last-child {
          margin-right: 0;
        }
        h2 {
          margin: 0;
          font-size: 1.5em;
          color: #333;
        }
      `}</style>
    </div>
  );
}
