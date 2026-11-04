import express from 'express'
import BancoDados from './repsitory/index.js'

const app =express()
app.use(express.json());

app.post("/livro/cadastro", (req, res) =>{
    const {id, titulo, autor} = req.body;

    if( !id || !titulo || !autor ){
        res.send({message: "Pedir para enviar todas as informações!"})
        return
    }
    BancoDados.push({ id, titulo, autor})
    res.send({ message: "livro criado com sucesso!"})

})

app.get("/livro", (req, res) => {
    res.json(BancoDados)
})
app.get("/livro/:id", (req, res) => {
    const id = req.params.id

    if(!id){
        res.send({message: "Id não encontrado!"})
        return 
    }

    const livro = BancoDados.find(p => p.id == id)

    if(!livro){
        res.send({message: "Id não encontrado!"})
        return 
    }


    res.send({message: livro})

})

app.delete("/livro/:id", (req, res) => {
    const id = req.params.id

    if(!id){
        res.send({message: "Id não encontrado!"})
        return 
    }

    // buscar pelo id, pra achar aposisao no array
    const index = BancoDados.findIndex(p => p.id == id)

    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return 
    }

    BancoDados.splice(index, 1)

    res.send({message: "livro removido"})

})


app.listen(3000, () =>{
    console.log("servidor rodando na porta 3000")
})

