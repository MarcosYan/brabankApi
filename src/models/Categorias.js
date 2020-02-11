const baseQuery = require('./baseQuery')

class Categoria {
	lista() {
		return baseQuery(' select * from categoria ')
	}

	insere(categoria) {
		return baseQuery(' insert into categoria set ? ', categoria)
	}

	buscarPorId(id) {
		return baseQuery(' select * from categoria where id = ? ', id)
	}

	atualiza(categoria) {
		return baseQuery(' update categoria set ? where id = ? ', [categoria, categoria.id])
	}

	delete(id) {
		return baseQuery(' delete from categoria where id = ?', id)
	}
}

module.exports =  Categoria

