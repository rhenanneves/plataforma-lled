import mongoose from "mongoose";

// Define o schema do curso
const CursoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});

// Cria ou usa o modelo Curso
const Curso = mongoose.models.Curso || mongoose.model('Curso', CursoSchema);

export default Curso;
