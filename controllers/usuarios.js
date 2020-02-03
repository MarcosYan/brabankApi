const {  validationResult } = require('express-validator')
const UsuariosValid = require('../validators/Usuarios') 


const usuarios = (app) => {

    app.get('/', (req, res) =>{
        res.send('Rota NodeJs')
    })

    app.get('/usuarios', (req, res) =>{
        const usuarioDao =  app.models.Usuarios

        usuarioDao.lista()
            .then(lista => {
                res.send(lista)
            })
            .catch(erro =>{
                console.log(erro)
                res.status(500).send(erro)
            })
    })

    app.post('/usuarios',
        UsuariosValid.validacoes()
    ,(req, res) => {
        let usuario = req.body

        // retorna uma lista de erros
        const erros = validationResult(req)


        if(!erros.isEmpty()) {
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

    app.get('/usuarios/email/:email', (req, res)=>{
        const email = req.params.email
        usuarioDao = app.models.Usuarios
        usuarioDao.buscarPorEmail(email)
        .then(retorno => {
            if(retorno){
                res.send(retorno)
            }else{
                res.status(404).send()
            }
            res.send(retorno)
        })
        .catch(erro => res.status(500).send(erro))
    })
    
}

module.exports = usuarios