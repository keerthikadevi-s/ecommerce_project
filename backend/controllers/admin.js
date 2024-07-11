const Admin = require("../models/admin.js")
const { v4: uuidv4 } = require('uuid');
const { setAdmin} = require("../services/auth.js");
const accessKey = "1234567890";

async function adminSignup(req, res) {
    const body = req.body;

    const password = body.password;
    const password2 = body.repassword;

    if (password !== password2) {
        return res.json({ status: "Passwords do not match" }).status(400);
    }
    else if (body.accessKey !== accessKey) {
        return res.json({ status: "Invalid access key" }).status(400);
    }

    await Admin.create({
        userId: body.userId,
        email: body.email,
        password: body.password
    })

    return res.status(201).json({ status: "Created new admin" });
}

async function adminLogin(req, res) {
    const body = req.body;

    const admin = await Admin.findOne({userId: body.userId, password: body.password});
    if(!admin) return res.status(404).json({status: "Incorrect username or password"});

    const sessionId = uuidv4();
    setAdmin(sessionId, admin);

    //Using cookies to store session id
    res.cookie("sessionId", sessionId);

    return res.status(201).json({status: "Access granted"})
    // .redirect("/products/update");
}

module.exports = {adminSignup, adminLogin};