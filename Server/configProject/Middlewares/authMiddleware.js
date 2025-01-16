import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  console.log("Entrou no authMiddleware");

  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recebido no backend:", token);

  const publicOperations = ["addNewUser", "login"];

  const operationName = req.body?.operationName;

  if (publicOperations.includes(operationName)) {
    return next();
  }

  if (!token) {
    console.error("Token não encontrado");
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      iat: decoded.iat,
      exp: decoded.exp,
    };
    // Definindo o user no req.user
    req.user = decoded;

    console.log("req.user definido no middleware:", req.user);

    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error.message);
    return res.status(401).json({ error: "Token not valid or expired" });
  }
};

export default authMiddleware;
