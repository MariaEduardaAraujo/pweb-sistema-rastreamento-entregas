import database from "../config/database.sqlite.js"
import { IMotoristasRepository } from "../interfaces/IMotoristasRepository.js"

export class MotoristasRepository extends IMotoristasRepository{
    constructor(){
        super()
        this.database = database
    }
    listarTodos(){
        return this.database.prepare(
            "SELECT * FROM TAB_MOTORISTAS"
        ).all()
    }
    buscarPorId(id){
        return this.database.prepare(
            "SELECT * FROM TAB_MOTORISTAS WHERE id = ?"
        ).get(id) ?? null
    }
    buscarPorCPF(cpf){
        return this.database.prepare(
            "SELECT * FROM TAB_MOTORISTAS WHERE cpf = ?"
        ).get(cpf) ?? null
    }
    criar(dados){
        const stmt = this.database.prepare(
            "INSERT INTO TAB_MOTORISTAS (nome, cpf, placaVeiculo) VALUES (?, ?, ?)"
        )

        const info = stmt.run(
            dados.nome,
            dados.cpf,
            dados.placaVeiculo
        )

        return this.buscarPorId(info.lastInsertRowid)
    }
    atualizar(id, dados){
        const stmt = this.database.prepare(
            "UPDATE TAB_MOTORISTAS SET nome = ?, cpf = ?, placaVeiculo = ? WHERE id = ?"
        )
        
        const info = stmt.run(
            dados.nome,
            dados.cpf,
            dados.placaVeiculo,
            id
        )

        if (info.changes === 0) return null
        return this.buscarPorId(id)
    }
}