import { Router } from "express"
import { painelEntregasController  } from "../bootstrap/bootstrap.js"
import { painelMotoristasController  } from "../bootstrap/bootstrap.js"

const router = Router()

router.get("/entregas", painelEntregasController.index)
router.get("/entregas/nova", painelEntregasController.nova)
router.post("/entregas", painelEntregasController.criar)
router.get("/entregas/:id", painelEntregasController.detalhe)
router.put("/entregas/:id/status", painelEntregasController.avancarStatus)
router.delete("/entregas/:id/cancelar", painelEntregasController.cancelar)

router.get("/motoristas", painelMotoristasController.index)
router.get("/motoristas/novo", painelMotoristasController.novo)
router.post("/motoristas", painelMotoristasController.criar)

export default router