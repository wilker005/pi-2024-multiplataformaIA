const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/evento'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let tituloInput = document.querySelector('#nomeInput')
    let descricaoInput = document.querySelector('#descricaoInput')
    // let urlBannerInput = document.querySelector('#urlBannerInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let dataFimInput = document.querySelector('#dataFimInput')
    let horarioInicioInput = document.querySelector('#horarioInicioInput')
    let horarioFimInput = document.querySelector('#horarioFimInput')
    let valorInput = document.querySelector('#valorInput')
    let urlIngressoInput = document.querySelector('#urlIngressoInput')
    let ruaInput = document.querySelector('#ruaInput')
    let numeroInput = document.querySelector('#numeroInput')
    let bairroInput = document.querySelector('#bairroInput')
    let estadoInput = document.querySelector('#estadoInput')
    let cepInput = document.querySelector('#cepInput')
    let complementoInput = document.querySelector('#complementoInput')
    console.log(dataInicioInput.value)

    //pega os valores digitados pelo usuário
    let nome = nomeInput.value
    let descricao = descricaoInput.value
    // let urlBanner = urlBannerInput.value
    let dataInicio = dataInicioInput.value
    let dataFim = dataFimInput.value
    let horarioInicio = horarioInicioInput.value
    let horarioFim = horarioFimInput.value
    let ingresso = {
        valor: valorInput.value,
        urlIngresso: urlIngressoInput.value
    }

    let endereco = {
        rua: ruaInput.value,
        numero: numeroInput.value,
        bairro: bairroInput.value,
        estado: estadoInput.value,
        cep: cepInput.value,
        complemento: complementoInput.value
    }
    
    //limpa os campos que o usuário digitou
    nomeInput.value = ""
    descricaoInput.value = ""
    // urlBannerInput = ""
    dataInicioInput.value = ""
    dataFimInput.value = ""
    horarioInicioInput.value = ""
    horarioFimInput.value = ""
    valorInput.value = ""
    urlIngressoInput.value = ""
    ruaInput.value = ""
    numeroInput.value = ""
    bairroInput.value = ""
    estadoInput.value = ""
    cepInput.value = ""
    complementoInput.value = ""

    try{
        //envia os dados ao servidor (back end)
    const eventos = (await axios.post(URLCompleta, {
        nome,
        descricao,
        // urlBanner,
        dataInicio,
        dataFim,
        horarioInicio,
        horarioFim,
        ingresso,
        endereco
        })).data
        console.log(eventos)
        exibirAlerta("Evento cadastrado com sucesso!","alert-success")
    }catch(error){
        exibirAlerta("Ocorreu um erro ao tentar cadastrar o evento","alert-danger")
        console.log(error)
    }
}

async function buscarEventos(){
    const eventosEndpoint = '/eventos'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`
    const eventos = (await axios.get(URLCompleta)).data

    eventos.forEach(evento => {
        addHtml(evento)
        console.log(evento)
    })
}

function addHtml(evento){
    eventoHtml = `
        <div class="col-sm-4">
            <div class="card">
                <img src="img/capa-evento.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${evento.nome}</h5>
                        <h6 class="card-subtitle">${evento.dataInicio} - ${evento.horarioInicio}</h6>
                        <p class="card-text">${evento.descricao}</p>
                        <div class="categories">
                            <a href="#" class="card-link">Categoria</a>
                            <a href="#" class="card-link">Categoria</a>
                        </div>
                    </div>
            </div>
        </div>
    `

    const eventos = document.querySelector('.row-eventos')
    eventos.innerHTML += eventoHtml
}

function exibirAlerta(alerta, classe){
    let divAlerta = document.getElementById('alert')

    divAlerta.classList.add('show')
    divAlerta.classList.remove('hidden')
    divAlerta.classList.add(classe)
    
    divAlerta.innerHTML = alerta
}


 
