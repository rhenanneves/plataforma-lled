import User from "../models/User";
import Curso from "../models/Curso";

// Função para cadastrar um novo usuário (funcionário ou gerente)
export const createUser = async (req, res) => {
  const { name, email, password, tipo } = req.body;

  // Verificar se o tipo é válido (funcionário ou gerente)
  if (!["funcionario", "gerente"].includes(tipo)) {
    return res.status(400).json({ message: "Tipo de usuário inválido." });
  }

  try {
    const newUser = new User({ name, email, password, tipo });

    await newUser.save();

    res.status(201).json({
      message: `Usuário ${tipo} cadastrado com sucesso!`,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao cadastrar usuário.",
      error: error.message,
    });
  }
};

// Função para cadastrar um novo curso
export const createCurso = async (req, res) => {
  const { title, userId, status } = req.body;

  // Verifica se o usuário informado existe
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const newCurso = new Curso({
      title,
      userId,
      status: status || "Em progresso", // Por padrão, o curso estará "Em progresso"
    });

    await newCurso.save();

    res.status(201).json({
      message: "Curso cadastrado com sucesso!",
      curso: newCurso,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao cadastrar curso.",
      error: error.message,
    });
  }
};

// Função para listar todos os usuários (funcionários e gerentes)
export const listUsers = async (req, res) => {
  try {
    const users = await User.find({ tipo: { $in: ["funcionario", "gerente"] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários.", error });
  }
};

// Função para listar todos os cursos
export const listCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar cursos.", error });
  }
};
