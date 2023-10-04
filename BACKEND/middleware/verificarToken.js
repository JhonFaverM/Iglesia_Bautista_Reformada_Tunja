//ver video en 01/27 3:02

const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    let token = req.header('Authorization')
    if (!token) res.send({ "msg": "No hay ningún token en header" })
    token = token.split(' ')[1]
    if (!token) res.send({ "msg": "No hay ningún token en header" })
    try {
        let tokenPayload = jwt.verify(token, "iglesia-tunja")
        req.administrador = tokenPayload   //asesor es nombre cualquier, guarda lo que decodifica
        next()
    } catch (err) {
        res.send({ "msg": "Token no es correcto!" })
    }
}

module.exports = {
    verificarToken
}