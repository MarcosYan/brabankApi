//importando o express
const express =  require('express')
// instanciamos ele
const app  = express()
const consign = require('consign')
const bodyParser = require('body-parser')

customExpress = () =>{  


    //para dados de formularios
    // app.use(bodyParser.urlencoded())
    app.use(express.json())

    consign()
    .include('controllers')
    .include('models')
    .into(app)

    //retorna o app configurado
    return app
} 

// invocando a função customExpress
module.exports = customExpress()

