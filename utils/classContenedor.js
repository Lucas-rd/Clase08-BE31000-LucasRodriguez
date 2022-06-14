import fs from 'fs';


//test push
class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }

    //metodo save:
    async postProduct(req){
        try{
            let products = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let parseProducts = await JSON.parse(products)

            let id = parseProducts.length + 1
            let { title, price, thumbnail } = req.body
            
            const newProduct = {
                "title":title,
                "price":price,
                "thumbnail":thumbnail,
                "id":id
            }

            parseProducts.push(newProduct)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(parseProducts, null, "\t"))
            
            return newProduct
            
        } catch(error) {
            console.log(`Ocurrio un error al guardar. El error fue: ${error}`)
        }
    }

    async getById(req){
        try{
            let { id } = req.params
            let productos = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let parseProducts = await JSON.parse(productos)
            let searchId = parseProducts.find(element => element.id == id)

            if(searchId){
                return searchId
            } else {
                return {error: `Producto con id ${id} no encontrado`}
            }
        }catch (error){
            console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        }
    }

    async getAll(){
        try {
            let productos = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            const parseProducts = await JSON.parse(productos)
            return parseProducts
        } catch (error) {
            console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        }
    }

    async deleteById(req){
        try {
            let { id } = req.params

            let productos = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8")
            let parseProducts = JSON.parse(productos)
            const filterProducts = parseProducts.filter(element => element.id != id)
            
            await fs.promises.unlink(`./${this.nombreArchivo}`)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(filterProducts, null, "\t"))
            
            return `El nuevo stock es:`, filterProducts
        } catch (error) {
            console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        }
    }

    async modifyById(req){
        try {
            let products = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let parseProducts = await JSON.parse(products)
            let { id } = req.params
            let { title, price, thumbnail } = req.body

            const filterProducts = parseProducts.map((element) =>{
                if(element.id == id){
                   return {
                    title: title,
                    price:price,
                    thumbnail:thumbnail,
                    id: element.id
                   }
                } else {
                    return element
                }
            })

            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(filterProducts, null, "\t"))

            return filterProducts

        } catch (error) {
            console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.unlink(`./${this.nombreArchivo}`)

            products = []
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(products, null, "\t"))
            console.log("Productos eliminados: ", products)
        } catch (error) {
            console.log(`Ocurrio un error al eliminar archivo. El error fue: ${error}`)
        }
    }
}

//Comandos de ejecucion en orden:
// const archivo = new Contenedor("productos.txt")

//Ir comentando y descomentando para la ejecucuion

// 1 - Creacion de productos con metodo save
// archivo.save({
//     title:"Mazo commander 1",
//     price: 100,
//     thumbnail: "https://http2.mlstatic.com/D_NQ_NP_847134-MLA49546578890_042022-O.webp"
// })

// archivo.save({
//     title:"Mazo comander 2",
//     price: 200,
//     thumbnail: "https://www.elrincondemagic.com/WebRoot/StoreLES/Shops/64576138/620A/2932/5562/8124/B02B/0A0C/6D0D/296B/Mazo_NEO_Abrochate_Cinturon.png"
// })

// archivo.save({
//     title:"Mazo comander 3",
//     price: 300,
//     thumbnail: "https://media.magic.wizards.com/en_PaLTnONM9E.png"
// })

// archivo.save({
//     title:"Mazo comander 4",
//     price: 400,
//     thumbnail: "https://www.elrincondemagic.com/WebRoot/StoreLES/Shops/64576138/5EA9/426B/6A87/8F3E/696A/0A0C/6D0B/4F50/Mazo_Commander_Ikoria_Ruthless_Regiment_m.png"
// })

// archivo.save({
//     title:"Mazo comander 5",
//     price: 500,
//     thumbnail: "https://www.elrincondemagic.com/WebRoot/StoreLES/Shops/64576138/5EA9/426B/6A87/8F3E/696A/0A0C/6D0B/4F50/Mazo_Commander_Ikoria_Ruthless_Regiment_m.png"
// })

// 2 - Buscamos un elemento unico mediante el id con metodo getById:
// archivo.getById(2).then( res =>{
//     console.log(res)
// })

// 3- Buscamos todo el array de objetos con el metodo getAll:
// archivo.getAll().then( res =>{
//     console.log(res)
// } )

// 4 - Eliminamos un producto especifico mediante un id con el metodo deleteById:
// archivo.deleteById(2)


// 5 - Eliminamos todos los productos y mostramos el array de productos vacio en consola mediante el metodo deleteAll:
// archivo.deleteAll()


export default Contenedor