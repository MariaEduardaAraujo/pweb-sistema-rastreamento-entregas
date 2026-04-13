export class RelatoriosController{
    constructor(service){
        this.service = service

        this.entregaPorStatus = this.entregaPorStatus.bind(this)
        this.motoristasAtivos = this.motoristasAtivos.bind(this)
    }
    async entregaPorStatus(req, res, next){
        try{
            const entrega = await this.service.entregaPorStatus()
            res.status(200).json(entrega)
        }catch (err){
            next(err)
        }
    }
    async motoristasAtivos(req, res, next){
        try {
            const motorista = await this.service.motoristasAtivos()
            res.status(200).json(motorista)
        } catch (err) {
            next(err)
        }
    }
}