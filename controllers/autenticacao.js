const {  validationResult } = require('express-validator')
const UsuariosValid = require('../validators/Usuarios') 

const autenticacao = (app) => {

    app.post('/registrar',

        UsuariosValid.validacoes()
        , (req, res) => {
            let usuario = req.body

            // retorna uma lista de erros
            const erros = validationResult(req)


            if (!erros.isEmpty()) {
                res.status(400).send(erros)
                return
            }

            const usuariosDao = app.models.Usuarios

            usuariosDao.insere(usuario)
                .then(retorno => res.status(201).send(retorno))
                .catch(erro => {
                    console.log(erro)
                    res.status(500).send(erro)
            })
        })

    app.post('/autenticar', (req, res) => {

    })
}

module.exports = autenticacao