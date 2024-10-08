import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tipo: { 
    type: String, 
    enum: ["funcionario", "gerente", "admnistrador"], 
    required: true 
  },
  password: {
    type: String,
    required: true,
  },
  cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Curso" }],
});

// Pre-save middleware para hash de senha
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
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

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
