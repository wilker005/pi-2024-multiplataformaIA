const Evento = require("../models/Evento")

const getEventos = async(req, res) => {
    const eventos = await Evento.find()
    res.json(eventos)
}

const postEvento = async (req, res) => {
    try {
        const nome = req.body.nome
        const data_inicio = new Date(req.body.data_inicio) // Garantir que a data seja do tipo Date
        const categoria = req.body.categoria
        const descricao = req.body.descricao
        const url_banner = req.body.url_banner
        const preco = req.body.preco
        const organizador = req.body.organizador
        const estado = req.body.estado
        const cidade = req.body.cidade
        const endereco = req.body.endereco
        const numero = req.body.numero
        const data_cadastro = new Date() // A data de cadastro deve ser a data atual

        // Verificar se a data de início foi passada corretamente
        if (isNaN(data_inicio)) {
            return res.status(400).json({ mensagem: "Data de início inválida" })
        }

        // Criar o evento com os dados fornecidos
        const evento = new Evento({
            nome: nome,
            data_inicio: data_inicio,
            categoria: categoria,
            descricao: descricao,
            url_banner: url_banner,
            preco: preco,
            organizador: organizador,
            estado: estado,
            cidade: cidade,
            endereco: endereco,
            numero: numero,
            data_cadastro: data_cadastro
        })

        // Salvar o evento no banco
        const novoEvento = await evento.save()

        // Buscar todos os eventos após a inserção
        const viewEvento = await Evento.findOne({ _id: novoEvento._id })

        // Retornar todos os eventos cadastrados
        res.json(viewEvento)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: "Erro ao salvar evento" })
    }
}

module.exports = {
    getEventos,
    postEvento
}