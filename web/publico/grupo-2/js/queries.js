const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/eventos'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let tituloInput = document.querySelector('#tituloInput')
    let descricaoInput = document.querySelector('#descricaoInput')
    let organizadorInput = document.querySelector("#organizadorInput")
    let dataInput = document.querySelector('#dataInput')
    let valorInput = document.querySelector('#valorInput')

    //pega os valores digitados pelo usuário
    let titulo = tituloInput.value
    let descricao = descricaoInput.value
    let organizador = organizadorInput.value
    
    if (titulo && descricao && organizador) {

        //limpa os campos que o usuário digitou
        tituloInput.value = ""
        descricaoInput.value = ""
        organizadorInput.value = ""

        //envia os dados ao servidor (back end)
        const eventos = (await axios.post(URLCompleta, {
            titulo,
            descricao,
            organizador
        })).data

        console.log(eventos)
        exibirAlerta('.alert-filme', 'Evento cadastrado com sucesso', ['show',
            'alert-success'], ['d-none'], 2000)
    }
    //senão, exibe o alerta por até 2 segundos
    else {
        // exibirAlerta('.alert-filme', 'Preencha todos os campos', ['show','alert-danger'], ['d-none'], 2000)
        console.log("preencha todos os campos")
    }
}


 
