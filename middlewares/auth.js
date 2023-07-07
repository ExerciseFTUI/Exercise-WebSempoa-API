import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authorization;

  if (!token) return res.status(401).json({ message: "Token Missing" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //Jika Error
    if (err) return res.status(403).json({ message: err.message });

    //JIka Berhasil Melewati Proses Verification
    req.username = decoded.username;
    req.role = decoded.role;
    req.id = decoded.id;
    next();
  });
};

//Verify the role
export const verifyRole = (roles) => {
  return function (req, res, next) {
    const userRole = req.role.toUpperCase();
    //Check the role
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).json({ message: "You dont have permission!" });
    }
  };
};
