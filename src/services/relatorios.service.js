export class RelatoriosService{
    constructor(repository){
        this.repository = repository
    }
    async entregaPorStatus(){
        return this.repository.entregaPorStatus()
    }
    async motoristasAtivos(){
        return this.repository.motoristasAtivos()
    }
}