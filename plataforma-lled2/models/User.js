import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define o schema do usuário
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ["funcionario", "gerente", "administrador"],
    required: true
  },
  cursos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Curso" 
  }]
});

// Hash a senha antes de salvar (funciona para criação e atualização)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Cria ou usa o modelo User
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
