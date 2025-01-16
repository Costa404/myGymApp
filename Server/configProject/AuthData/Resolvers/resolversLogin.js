import User from "../../Models/UsersSchema.js";
import bcrypt from "bcrypt";
import { generateTokenAndResponse } from "../AuthUtility/generateTokenAndResponse.js";

const resolversLogin = {
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Password incorreta");
      }

      const response = generateTokenAndResponse(user);
      return response;
    },
  },
};

export default resolversLogin;
