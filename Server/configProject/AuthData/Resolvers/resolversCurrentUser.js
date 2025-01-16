import User from "../../Models/UsersSchema.js";

const resolversCurrentUser = {
  Query: {
    CURRENT_USER: async (_, __, { user }) => {
      try {
        // Verifica se o usuário está autenticado
        console.log("User", user);
        if (!user) {
          throw new Error("Usuário não autenticado");
        }

        // Busca o usuário no banco de dados usando o ID do currentUser
        const dbUser = await User.findById(user.userId);

        if (!dbUser) {
          throw new Error("Usuário não encontrado");
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        throw new Error("Erro ao buscar usuário");
      }
    },
  },
};

export default resolversCurrentUser;
