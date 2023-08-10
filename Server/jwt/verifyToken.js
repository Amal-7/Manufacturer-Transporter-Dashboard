const secretKey = 'your-secret-key';
import  jwt  from "jsonwebtoken";


export default function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });// Unauthorized
    }



    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid Token.' }) // Unauthorized
        }

        req.user = decoded; // Store decoded user information for later use
        next();
    });
}