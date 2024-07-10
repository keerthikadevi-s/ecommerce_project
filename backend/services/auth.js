const sessionIdToUserMap = new Map();

function setAdmin (id, admin){
    sessionIdToUserMap.set(id, admin);
}

function getAdmin(id){
    return sessionIdToUserMap.get(id);
}

const accessKey = "1234567890";

function checkSignupData(req, res) {
    const body = req.body;

    const password1 = body.password1;
    const password2 = body.password2;

    if (password1 !== password2) {
        res.json({ status: "Passwords doesn't match" })
    }
    else if (body.accessKey !== accessKey) {
        res.json({ status: "Invalid Access Key" })
    }
}

module.exports = {setAdmin, getAdmin, checkSignupData};