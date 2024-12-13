import jwt from "jsonwebtoken";
export const verifytoken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
  
    if (!token) return res.status(400).send({"message":"Please provide token"});

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
