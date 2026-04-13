import { Router } from "express"
import { relatoriosController } from "../bootstrap/bootstrap.js"

const router = Router()

router.get("/entregas-por-status", relatoriosController.entregaPorStatus)
router.get("/motoristas-ativos", relatoriosController.motoristasAtivos)

export default router
