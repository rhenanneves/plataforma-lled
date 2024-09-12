import express from "express";
import { createUser, createCurso, listUsers, listCursos } from "../controllers/AdminController";

const router = express.Router();

// Rota para criar um usuário (somente admins)
router.post("/admin/users", createUser);

// Rota para listar todos os usuários (funcionários e gerentes)
router.get("/admin/users", listUsers);

// Rota para criar um curso (somente admins)
router.post("/admin/cursos", createCurso);

// Rota para listar todos os cursos
router.get("/admin/cursos", listCursos);

export default router;
