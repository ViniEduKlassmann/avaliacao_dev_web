import express from 'express'
import BancoDados from './repsitory/index.js'

const app =express()
app.use(express.json());

//Cadastro na rota
app.post("/livro/:id/:titulo/:autor", (req, res) =>{
    const {id, titulo, autor} = req.params;

    if( !id || !titulo || !autor ){
        res.send({message: "Pedir para enviar todas as informações!"})
        return
    }
    BancoDados.push({ id, titulo, autor})
    res.send({ message: "livro criado com sucesso!"})

})

//cadastro no body
app.post("/livro/cadastro", (req, res) =>{
    const {id, titulo, autor} = req.body;

    if( !id || !titulo || !autor ){
        res.send({message: "Pedir para enviar todas as informações!"})
        return
    }
    BancoDados.push({ id, titulo, autor})
    res.send({ message: "livro criado com sucesso!"})

})

// Para atualizar os dados dos livros
app.put("/livro/update", (req, res) => {
    const{id, titulo, autor} = req.body;
    
    const index = BancoDados.findIndex(p=> p.id==id)

    if(index == -1){
        res.send({message:"Id Não encontrado!"})
        return
    }
    BancoDados[index].titulo = titulo;
    BancoDados[index].autor = autor;

    res.send({message: "Livro atualizado com sucesso!"})

})

// Esse GET pega todos os livros cadstrados
app.get("/livro", (req, res) => {
    res.json(BancoDados)
})

/* Esse GET pega o id preenchido na URL, 
podendo pegar pelo Body utilisando Const id = req.body.id
e alterando a rota para /livros/busca*/
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

// DELETE com os dados do livro na URL Exemplo /livro/1
// DELETE com o ID na URL
app.delete("/livro/:id", (req, res) => {
    const id = req.params.id

    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }

    // Busca a posição do livro no array
    const index = BancoDados.findIndex(p => p.id == id)

    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return
    }
    // Remove o livro encontrado
    BancoDados.splice(index, 1)

    res.send({message: "Livro removido com sucesso!"})
})

// DELETE com os dados do livro no corpo
app.delete("/livro/delete", (req, res) => {
    const id = req.body.id

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