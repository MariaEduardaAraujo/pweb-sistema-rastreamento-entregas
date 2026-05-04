import express from "express"
import entregasRouter from "./src/routes/entregas.routes.js"
import { fileURLToPath } from 'url'
import { dirname, join }  from 'path'
import session from 'express-session'
import flash from 'connect-flash'
import expressLayouts from 'express-ejs-layouts'
import motoristasRouter from "./src/routes/motoristas.routes.js"
import relatoriosRouter from "./src/routes/relatorios.routes.js"
import painelRouter from "./src/routes/painel.routes.js"
import { errorMiddleware } from "./src/middlewares/error.middleware.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'src/views'))
app.set('layout', 'layouts/base')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(expressLayouts);
app.use(express.static(join(__dirname, 'public')))

app.use((req, res, next) => {
  res.locals.flash = { 
    sucesso: req.flash('sucesso'), 
    erro: req.flash('erro') 
  };
  next()
});

app.use("/api/entregas", entregasRouter)
app.use("/api/motoristas", motoristasRouter)
app.use("/api/relatorios", relatoriosRouter)
app.use("/painel", painelRouter)
app.use(errorMiddleware)

export default app