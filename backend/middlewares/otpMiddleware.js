const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer")) return res.status(401).json({ message: "No token" });
    try {
        const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET || "secret");
        req.userId = decoded.userId;
        next();
    } catch (e) { return res.status(401).json({ message: "Invalid token" }); }
};
module.exports = { protect };