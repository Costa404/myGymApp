import jwt from "jsonwebtoken";

export const generateTokenAndResponse = (user) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};
