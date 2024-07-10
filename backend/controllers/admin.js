const Admin = require("../models/admin.js")
const { v4: uuidv4 } = require('uuid');
const { setAdmin, checkSignupData } = require("../services/auth.js");

async function adminSignup() {
    const body = req.body;
    checkSignupData(req, res);
    await Admin.create({
        userId : body.userId,
        email : body.email,
        password: body.password
    })

    return res.status(201).json({status: "Created new admin"});
}

async function adminLogin() {
    const body = req.body;

    const admin = await Admin.findOne({userId: body.userId, password: body.password});
    if(!admin) return res.status(404).json({status: "Admin not found"});

    const sessionId = uuidv4();
    setAdmin(sessionId, admin);

    //Using cookies to store session id
    res.cookie("sessionId", sessionId);

    return res.status(201).json({status: "Created new admin"}).redirect("/products/update");
}

module.exports = {adminSignup, adminLogin};