const baseQuery = require('./baseQuery')

class Usuarios {
	lista() {
		return baseQuery(' select * from usuario ')
	}

	insere(usuario) {
		return baseQuery(' insert into usuario set ? ', usuario)
	}

	buscarPorEmail(email) {
		return baseQuery(' select * from usuario where email = ? ', email)
	}
}

module.exports = Usuarios

