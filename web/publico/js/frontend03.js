const protocolo = 'http://'
const baseURL = 'localhost:3000'

//fora de qualquer outra função, pode ser no final, depois de todas
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    //... é o spread operator
    // quando aplicado a um array, ele "desmembra" o array
    // depois disso, passamos os elementos do array como argumentos para add e
    // remove
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}

function ocultarModal(seletor, timeout){
    setTimeout(() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
    }, timeout)
}
    

async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/cadastrar'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let nomeInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput');
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let estadoInput = document.querySelector('#estadoInput')
    let numeroInput = document.querySelector('#numeroInput')
    let categoriasInput = document.querySelector('#categoriaInput')

    //pega os valores digitados pelo usuário
    let nome = nomeInput.value
    let dataInicio = dataInicioInput.value
    let preco = parseFloat(precoInput.value)
    let descricao = descricaoInput.value
    let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let numero = numeroInput.value
    let categorias = categoriasInput.value


    if (nome && dataInicio && preco >= 0 && descricao && urlLogo && urlSite && endereco && cidade && estado && numero && categorias) {

        //limpa os campos que o usuário digitou
        nomeEventoInput.value = "";
        dataInicioInput.value = "";
        precoInput.value = "";
        descricaoInput.value = "";
        urlLogoInput.value = "";
        urlSiteInput.value = "";
        enderecoInput.value = "";
        cidadeInput.value = "";
        estadoInput.value = "";
        numeroInput.value = "";
        categoriasInput.value = "";

        //envia os dados ao servidor (back end)
        const response = (await axios.post(URLCompleta, {
            nome,
            dataInicio,
            preco, 
            descricao,
            urlLogo,
            urlSite, 
            endereco,
            cidade, 
            estado, 
            numero,
            categorias
        })).data

             // Obtém a lista atualizada de eventos após o cadastro
             const eventos = response.data;       

        exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso', ['show',
            'alert-success'], ['d-none'], 2000)
                    
    }
    //senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-evento', 'Preencha todos os campos', ['show','alert-danger'], ['d-none'], 2000)
    }
}

// API de Login

const fazerLogin = async () => {
    let emailLoginInput = document.querySelector('#emailLoginInput')
    let senhaLoginInput = document.querySelector('#senhaLoginInput')
    let emailLogin = emailLoginInput.value
    let senhaLogin = senhaLoginInput.value
    if (emailLogin && senhaLogin) {
        try {
            const loginEndpoint = '/login'
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(
                URLCompleta,
                {login: emailLogin, senha: senhaLogin}
            )
            emailLoginInput.value=""
            senhaLoginInput.value=""
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

async function cadastrarUsuario() {
    let nomeCadastroInput = document.querySelector('#nomeCadastroInput')
    let emailCadastroInput = document.querySelector('#emailCadastroInput')
    let senhaCadastroInput = document.querySelector('#senhaCadastroInput')
    let confirmarSenhaCadastroInput = document.querySelector('#confirmarSenhaCadastroInput')
    let nomeCadastro = nomeCadastroInput.value
    let emailCadastro = emailCadastroInput.value
    let senhaCadastro = senhaCadastroInput.value
    let confirmarSenha = confirmarSenhaCadastroInput.value

    if (nomeCadastro && senhaCadastro && senhaCadastro && confirmarSenhaCadastro) {
        try {
            const cadastroEndpoint = '/cadastroUsuario'
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLCompleta,
                {
                    nome: nomeCadastro,
                    email: emailCadastro,
                    senha: senhaCadastro,
                    confirmarSenha: confirmarSenha
                }
            )
            nomeCadastroInput.value = ""
            emailCadastroInput.value = ""
            senhaCadastroInput.value = ""
            confirmarSenhaCadastroInput.value = ""
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
 
