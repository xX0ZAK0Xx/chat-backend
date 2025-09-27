import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if(!authorization){
            res.status(401).json({ error: "Unauthorized.." });
        }else{
            const token = authorization.split(" ")[1];
            if(token){
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const {id, name, email, role} = decodedToken;
                req.userId = id;
                req.userName = name;
                req.userEmail = email;
                req.userRole = role;
                next();
            }else{
                res.status(401).json({ error: "Unauthorized"});
            }
        }
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: " + error.message });
    }
}

export default validateToken