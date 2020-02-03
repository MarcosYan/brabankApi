const conexao = require('../config/conexao-db')

class Usuarios {
   lista(){
       return new Promise((resolve, reject) => {
           const sql = 'select * from usuario'

           conexao.query(sql, (erro, retorno) => {
               if(erro){
                reject('ERRO ao consultar: ' + erro)
                return
               } 

               console.log('consultado com sucesso!')
               resolve(retorno)
           })
       })
   }

   insere(usuario){
       return new Promise((resolve, reject) => {
           const sql = 'insert into usuario set ? '

           conexao.query(sql, usuario, (erro, retorno) => {
               erro ? 
                reject('ERRO ao inserir: ' + erro) :
                resolve({id:retorno.insertId, ...usuario})   
           })
       })
   }

   buscarPorEmail(email){
    return new Promise((resolve, reject) =>{
        const sql = 'select * from usuario where email = ? '

        conexao.query(sql, email, (erro, retorno) => {
           if(erro) reject('ERRO ao consultar: ' + erro)
           else{
               const usuario = retorno[0]
               resolve(usuario)
            //    if(usuario){
            //        console.log('Usuario encontrado')
            //        resolve(usuario)
            //    }else{
            //         console.log('Usuario não encontrado')
            //        reject({ erro: 'Usuario não encontrado'})
            //    }
           }
        })
    })
   }
}

module.exports =  new Usuarios()

