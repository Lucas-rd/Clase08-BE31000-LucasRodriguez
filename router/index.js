import { Router } from 'express';
import Contenedor from '../utils/classContenedor.js'

const router = Router()
const contenedor = new Contenedor("productos.txt")


router.get('/', (req, res) => {
    res.send('hola desde ruta home')
})

router.get('/productos', async (req, res) => {
    let products = await contenedor.getAll()
    res.send(products)
})

router.get('/productos/:id', async (req,res) => {
    let products = await contenedor.getById(req)
    res.send(products)
})

router.post('/productos', async (req, res) => {
    let products = await contenedor.postProduct(req)
    res.send(products)
})

router.put('/productos/:id', async (req, res) => {
    let products = await contenedor.modifyById(req)
    res.send(products)
})

router.delete('/productos/:id', async (req, res) => {
    let products = await  contenedor.deleteById(req)
    res.send(products)
})

export default router