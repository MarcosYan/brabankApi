const mysql  = require('mysql')

const conexao =  mysql.createConnection({
    host:'54.210.149.234',
    port:'3306',
    user: 'alnmarcos',
    password: 'ma@#RcoS',
    database: 'brabank'
})

module.exports = conexao