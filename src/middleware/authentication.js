import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const key = process.env.SECRET_KEY;
    jwt.verify(token, key, (err, data) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid" });
        return;
      }
      req.user = data;
      next();
    });
  } else {
    return res.status(401).json("Unauthenticated");
  }
};

const requireAuth = (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export { verifyToken };
