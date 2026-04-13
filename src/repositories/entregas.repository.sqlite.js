import database from "../config/database.sqlite.js"
import { IEntregasRepository } from "../interfaces/IEntregasRepository.js"

export class EntregasRepository extends IEntregasRepository{
    constructor(){
        super()
        this.database = database
    }
    listarTodos(){
        return this.database.prepare(
            "SELECT * FROM TAB_ENTREGAS"
        ).all()
    }
    buscarPorId(id){
        const entrega = this.database.prepare(
            "SELECT * FROM TAB_ENTREGAS WHERE id = ?"
        ).get(id) ?? null

        if (!entrega) return null

        const historico = this.database.prepare(
            "SELECT descricao, data_entrega as data FROM TAB_EVENTO_ENTREGA WHERE id_entrega = ? ORDER BY data_entrega ASC"
        ).all(id)

        return { ...entrega, historico }
    }
    criar(dados){
        const stmt = this.database.prepare(
            "INSERT INTO TAB_ENTREGAS (descricao, origem, destino) VALUES (?, ?, ?)"
        )

        const info = stmt.run(
            dados.descricao,
            dados.origem,
            dados.destino
        )
        
        const id = info.lastInsertRowid

        this.database.prepare(
            "INSERT INTO TAB_EVENTO_ENTREGA (id_entrega, descricao) VALUES (?, ?)"
        ).run(id, "Entrega criada")

        return this.buscarPorId(id)
    }
    atualizar(id, dados) {
        if (dados.status) {
            this.database.prepare(
                "UPDATE TAB_ENTREGAS SET status = ? WHERE id = ?"
            ).run(dados.status, id)
        }

        if (dados.motoristaId) {
            this.database.prepare(
                "UPDATE TAB_ENTREGAS SET id_motorista = ? WHERE id = ?"
            ).run(dados.motoristaId, id)
        }

        if (dados.historico) {
            const ultimo = dados.historico[dados.historico.length - 1]
            this.database.prepare(
                "INSERT INTO TAB_EVENTO_ENTREGA (id_entrega, descricao) VALUES (?, ?)"
            ).run(id, ultimo.descricao)
        }

        return this.buscarPorId(id)
    }
}