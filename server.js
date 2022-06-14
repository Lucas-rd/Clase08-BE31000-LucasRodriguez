import express from "express";
import router from "./router/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const PORT = 8080

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Statics
app.use('/form', express.static(`${__dirname}/html`))


app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
})

