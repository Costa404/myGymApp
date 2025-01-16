import bcrypt from "bcrypt";
import { generateTokenAndResponse } from "../AuthUtility/generateTokenAndResponse.js";
import User from "../../Models/UsersSchema.js";
const resolversSignup = {
  Mutation: {
    addNewUser: async (_, { username, password, email }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Usuário já existe");
      }

      const hashedPassword = await bcrypt.hash(password, 4);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      console.log("Novo usuário criado:", newUser);

      const { token } = generateTokenAndResponse(newUser);

      return {
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      };
    },
  },
};

export default resolversSignup;
