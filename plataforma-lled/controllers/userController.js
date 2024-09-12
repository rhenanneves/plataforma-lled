import User from '../models/User';

export const getUserById = async (req, res) => {
    try {
        // Procura o usuário pelo ID passado na query
        const user = await User.findById(req.query.id);

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna o usuário encontrado
        res.status(200).json(user);
    } catch (error) {
        // Trata erros do servidor e envia uma resposta apropriada
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
