export class MotoristasController {
  constructor(service) {
    this.service = service

    this.index = this.index.bind(this)
    this.novo = this.novo.bind(this)
    this.criar = this.criar.bind(this)
  }

  async index(req, res, next) {
    try {
      const resultado = await this.service.listarTodos()
      const motoristas = resultado.data ?? resultado 
      res.render('motoristas/index', { motoristas })
    } catch (err) { 
        next(err)
    }
  }

  async novo(req, res, next) {
    try {
      const motoristas = await this.service.listarTodos()
      res.render('motoristas/novo', { old: {}, erros: {} })
    } catch (err) { 
        next(err)
    }
  }

  async criar(req, res, next) {
    try {
      await this.service.criar(req.body)
      req.flash('sucesso', 'Motorista criado com sucesso')
      res.redirect('/painel/motoristas')
    } catch (err) {
      res.render('motoristas/novo', { 
        old: req.body, 
        erros: err.erros ?? { geral: err.mensagem },
        flashErro: err.message
      })
    }
  }
}