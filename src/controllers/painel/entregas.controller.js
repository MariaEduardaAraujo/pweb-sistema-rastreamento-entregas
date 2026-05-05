export class EntregasController{
    constructor(service, motoristasService){
        this.service = service
        this.motoristaService = motoristasService

        this.index = this.index.bind(this)
        this.nova = this.nova.bind(this)
        this.criar = this.criar.bind(this)
        this.detalhe = this.detalhe.bind(this)
        this.avancarStatus = this.avancarStatus.bind(this)
        this.cancelar = this.cancelar.bind(this)
    }
    async index(req, res, next) {
        try {
            const { status, page = 1 } = req.query
            const resultado = await this.service.listarTodos({ status, page })
            res.render('entregas/index', { 
            entregas: resultado.data,
            statusFiltro: status ?? '', 
            paginaAtual: Number(page),
            totalPages: resultado.totalPages
            })
        } catch (err) { 
            next(err)
        }
    }
    async nova(req, res, next){
        try{
            const resultado = await this.motoristaService.listarTodos()
            const motoristas = resultado.data ?? resultado
            res.render('entregas/nova', { old: {}, erros: {}, motoristas })
        }catch (err){
            next(err)
        }
    }
    async criar(req, res){
        try {
            await this.service.criar(req.body)
            req.flash('sucesso', 'Entrega criada com sucesso')
            res.redirect('/painel/entregas')
        } catch (err) {
            const motoristas = await this.motoristaService.listarTodos()
            res.render('entregas/nova', { old: req.body, erros: err.erros ?? { geral: err.message }, motoristas })
        }
    }
    async detalhe(req, res){
        try{
            const entrega = await this.service.buscarPorId(Number(req.params.id))
            res.render('entregas/detalhe', { entrega })
        }catch (err){
            req.flash('erro', err.message)
            res.redirect('/painel/entregas')
        }
    }
    async avancarStatus(req, res) {
        try {
            await this.service.avancar(Number(req.params.id))
            req.flash('sucesso', 'Status atualizado')
            res.redirect(`/painel/entregas/${req.params.id}`)
        } catch(err) {
            req.flash('erro', err.message);
            res.redirect(`/painel/entregas/${req.params.id}`)
        }
    }
    async cancelar(req, res) {
        try {
            await this.service.cancelar(req.params.id)
            req.flash('sucesso', 'Entrega cancelada')
            res.redirect('/painel/entregas')
        } catch(err) {
            req.flash('erro', err.message)
            res.redirect(`/painel/entregas/${req.params.id}`)
        }
    }
}