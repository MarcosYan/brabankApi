const jwt = require('jsonwebtoken')
const auth = require('../config/auth')


module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization

    //verifica se tem Authorization no header
    if (!authHeader)
        return res.status(401).send({ erro: 'Token não informado' })

    const parts = authHeader.split(' ')

    //verifica se o Authorization tem duas partes
    if (parts.length !== 2)
        return res.status(401).send({ erro: 'Erro no token' })

    const [bearer, token] = parts

    //verifica se a primeira parte contém o Bearer
    if (!/^Bearer$/i.test(bearer))
        return res.status(401).send({ erro: 'Token mal formatado' })


    //verifica se o token e valido
    try{
        const decoded = await jwt.verify(token, auth.secret)
        req.userId = decoded.id
        return next()
    }catch(erro){
        res.status(401).send({ erro: 'Token inválido' })
    }	

}