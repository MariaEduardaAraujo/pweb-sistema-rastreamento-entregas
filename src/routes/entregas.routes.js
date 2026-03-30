import { Router } from "express"
import { Database } from "../database/database.js"
import { EntregasRepository } from "../repositories/entregas.repository.js"
import { EntregasService } from "../services/entregas.service.js"
import { EntregasController } from "../controllers/entregas.controller.js"

const database = new Database()
const entregasRepository = new EntregasRepository(database)
const entregasService = new EntregasService(entregasRepository, motoristasRepository)
const entregasController = new EntregasController(entregasService)

const router = Router()

router.get("/", entregasController.listarTodos)
router.get("/:id", entregasController.buscarPorId)
router.post("/", entregasController.criar)
router.patch("/:id/avancar", entregasController.avancar)
router.patch("/:id/cancelar", entregasController.cancelar)
router.get("/:id/historico", entregasController.historico)

export default router