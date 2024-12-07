const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/evento'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let nomeInput = document.querySelector('#nomeInput')
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

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        try {
            const cadastroEndpoint = '/signup'
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLCompleta,
                {
                    login: usuarioCadastro,
                    password: passwordCadastro
                }
            )
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!",
                ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
                ocultarModal('#modalLogin', 2000)
        }
        catch (error) {
            exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show',
                'alert-danger'], ['d-none', 'alert-success'], 2000)
                ocultarModal('#modalLogin', 2000)
        }
    }
    else {
        exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show',
            'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
        try {
            const loginEndpoint = '/login'
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(
                URLCompleta,
                {login: usuarioLogin, password: passwordLogin}
            )
            usuarioLoginInput.value=""
            passwordLoginInput.value=""
            exibirAlerta('.alert-modal-login', "Usuário logado com sucesso!",
                ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
                ocultarModal('#modalLogin', 2000)
            const loginLink = document.querySelector('#loginLink')
            loginLink.innerHTML="Logout"

        }catch (error) {
            exibirAlerta('.alert-modal-login', 'Falha no login', ['show','alert-danger'], ['d-none', 'alert-success'], 2000)
            console.log(error)
        }
    } else{
        exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show','alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

function exibirAlerta(alerta, classe){
    let divAlerta = document.getElementById('alert')

    divAlerta.classList.add('show')
    divAlerta.classList.remove('hidden')
    divAlerta.classList.add(classe)
    
    divAlerta.innerHTML = alerta
}


 
