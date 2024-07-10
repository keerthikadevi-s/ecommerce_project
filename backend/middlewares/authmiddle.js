const {getAdmin} = require("../services/adminService");

async function restrictToLoggedIn(req, res, next) {
    const sessionId = req.cookies?.sessionId;
    if(!sessionId) return res.status(401).json({status: "Unauthorized"}).redirect("/login");
    const admin = getAdmin(sessionId);
    if(!admin) return res.status(401).json({status: "Unauthorized"}).redirect("/login");

    req.admin = admin;
    next();
}

module.exports = restrictToLoggedIn;

