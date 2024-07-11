const {getAdmin} = require("../services/auth.js");

async function restrictToLoggedIn(req, res, next) {
    const sessionId = req.cookies?.sessionId;
    if(!sessionId) return res.status(401).json({status: "Unauthorized access"});
    const admin = getAdmin(sessionId);
    if(!admin) return res.status(401).json({status: "Unauthorized access"});

    req.admin = admin;
    next();
}

module.exports = restrictToLoggedIn;

