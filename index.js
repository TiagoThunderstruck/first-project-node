const express = require("express") // IMPORTAR A BIBLIOTECA --> express <-- FRAMEWORK DE GERENCIAMENTO DE ROTAS E CRIA-SE A VARIÁVEL COM O MESMO NOME; 
const server = express() // app OU server É O NOME + UTILIZADO NESTA VARIÁVEL; 

server.use(express.json())

const uuid = require("uuid") // VARIÁVEL PRA ARMAZENAR BIBLIOTECA QUE GERA IDENTIFICAÇÃO ALEATÓRIA E ÚNICA; 
const port = 3000
const users = [] // ISTO NUNCA SERÁ USADO, É APENAS PRA FINS DIDÁTICOS UTILIZANDO UM ARMAZENAMENTO VOLÁTIL DA VARIÁVEL; 

const checkUserId = (request, response, next) => {
    const { id } = request.params // BUSCANDO IDENTIFICAÇÃO ÚNICA PELO --> route params <--
    const index = users.findIndex(user => user.id === id) // PROCURAR INFORMAÇÕES DE IDENTIFICAÇÃO EXISTENTE;  

    if (index < 0) {
        return response.status(404).json({ Error: "User not found 😭 | Usuário não encontrado 🧐 " })
    }

    request.userIndex = index
    request.userId = id
    next()
} // middleware --> TAMBÉM É UMA ROTA; 

server.get("/users", (request, response) => {
    return response.json(users)
}) // ROTA TIPO --> get <-- BUSCAR INFORMAÇÕES & EXPOR ALGUMA COISA NO BACK-END; 

server.post("/users", (request, response) => {
    const { name, age } = request.body // USANDO A DESESTRUTURAÇÃO PRA BUSCAR OS DADOS; 
    const user = { id: uuid.v4(), name, age } // MONTANDO O USUÁRIO CHAMANDO UMA FUNCÃO DENTRO DA BIBLIOTECA PRA QUE ELA CRIE A IDENTIFICAÇÃO;  
    users.push(user) // ADICIONANDO O NOVO USUÁRIO À LISTA DE USUÁRIOS --> users <--
    return response.status(201).json(user) // RETORNANDO APENAS O NOVO USUÁRIO CRIADO; 
}) // ROTA TIPO --> post <-- CRIAR... 

server.put("/users/:id", checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser
    return response.json(updateUser)
}) // ROTA DO TIPO --> put|path --> ATUALIZAR...

server.delete("/users/:id", checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json() // status <-- QUE COMEÇAM COM --> 2 <-- SÃO SEMPRE DE SUCESSO; 
}) // ROTA TIPO --> delete <-- APAGAR... 

server.listen(port, () => {
    console.log(`🚀 Server started on port ${port} | 🚦 Servidor iniciado na porta ${port}`)
}) // QUAL PORTA ESTA APLICAÇÃO VAI RODAR, NO CASO DO NODE A PORTA 3000