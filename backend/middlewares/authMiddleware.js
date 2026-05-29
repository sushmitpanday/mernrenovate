const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Header se token nikaalo (Bearer <token>)
            token = req.headers.authorization.split(" ")[1];

            // Token verify karo
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "silverbricks_secret_key");

            // Request object mein decoded userId attach karo taaki controllers use kar sakein
            req.userId = decoded.userId;

            next();
        } catch (error) {
            console.error("❌ Token verification failed:", error.message);
            return res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token found" });
    }
};

module.exports = { protect };