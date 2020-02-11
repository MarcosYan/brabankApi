const { validationResult } = require('express-validator')
// const UsuariosValid = require('../../../validators/Usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')
const usuarioDAO = new (require('../../models/Usuarios'))()

gerarToken = (params) => jwt.sign(params, auth.secret, { expiresIn: 1200 })


module.exports = {
	async registra(req, res) {
		const erros = validationResult(req)

		if (!erros.isEmpty())
			return res.status(400).send(erros)

		let usuario = req.body

		try {
			const hash = await bcrypt.hash(usuario.senha, 10)
			usuario.senha = hash
			const resultado = await usuarioDAO.insere(usuario)
			usuario = { id: resultado.insertId, ...usuario }

			res.status(201).send({
				usuario,
				token: gerarToken({ id: usuario.id })
			})
		} catch (erro) {
			console.log(erro)
			res.status(500).send(erro)
		}
	},

	async autentica(req, res) {
		const { email, senha } = req.body

		try {
			let usuario = await usuarioDAO.buscarPorEmail(email)

			console.log(usuario)
			usuario = usuario[0]

			// console.log(senha)

			if (!usuario)
				return res.status(401)
					.send({ erro: 'Usuário e/ou inválidos' })

			if (!await bcrypt.compare(senha, usuario.senha))
				return res.status(401)
					.send({ erro: 'Usuário e/ou inválidos' })

			delete usuario.senha
			res.send({
				usuario,
				token: gerarToken({ id: usuario.id })
			})
		} catch (erro) {
			console.log(erro)
			res.status(500).send(erro)
		}
	}
}

