const protocolo = 'http://'
const baseURL = 'localhost:3000'

function formatarDataDDMMYYYY(data) {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

//fora de qualquer outra função, pode ser no final, depois de todas
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    //... é o spread operator
    //quando aplicado a um array, ele "desmembra" o array
    //depois disso, passamos os elementos do array como argumentos para add e
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
    let cepInput = document.querySelector('#cepInput')
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
    let cep = cepInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let numero = numeroInput.value
    let categorias = categoriasInput.value


    if (nome && dataInicio && preco >= 0 && descricao && urlLogo && urlSite && cep && endereco && cidade && estado && numero && categorias) {

        //limpa os campos que o usuário digitou
        nomeEventoInput.value = "";
        dataInicioInput.value = "";
        precoInput.value = "";
        descricaoInput.value = "";
        urlLogoInput.value = "";
        urlSiteInput.value = "";
        enderecoInput.value = "";
        cepInput.value = "";
        cidadeInput.value = "";
        estadoInput.value = "";
        numeroInput.value = "";
        categoriasInput.value = "";

        //envia os dados ao servidor (back end)
        try {
        const response = (await axios.post(URLCompleta, {
            nome,
            dataInicio,
            preco, 
            descricao,
            urlLogo,
            urlSite, 
            endereco,
            cep,
            cidade, 
            estado, 
            numero,
            categorias
        })).data

             // Obtém a lista atualizada de eventos após o cadastro
             const eventos = response.data;       

        exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso', ['show',
            'alert-success'], ['d-none'], 2000)
                 
        } catch(error) {
             // Caso ocorra um erro ao cadastrar
             console.error(error);
             exibirAlerta('.alert-evento', 'Erro ao cadastrar evento', ['show', 'alert-danger'], ['d-none'], 2000);
        }
    }
    //senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-evento', 'Preencha todos os campos', ['show','alert-danger'], ['d-none'], 2000)
    }
}



// API de Login
const fazerLogin = async () => {
    const emailLoginInput = document.querySelector('#emailLoginInput');
    const senhaLoginInput = document.querySelector('#senhaLoginInput');
    const emailLogin = emailLoginInput.value;
    const senhaLogin = senhaLoginInput.value;

    if (emailLogin && senhaLogin) {
        try {
            const loginEndpoint = '/loginUsuario';
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`;
            const response = await axios.post(URLCompleta, { email: emailLogin, senha: senhaLogin });
            
            // Armazenar o nome do organizador no localStorage
            localStorage.setItem('organizadorNome', response.data.nome);

            emailLoginInput.value = '';
            senhaLoginInput.value = '';
            exibirAlerta('.alert-modal-login', "Usuário logado com sucesso!",
                ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000);
            ocultarModal('#modalLogin', 2000);

            const loginLink = document.querySelector('#loginLink');
            loginLink.innerHTML = "Logout";
        } catch (error) {
            exibirAlerta('.alert-modal-login', 'Falha no login', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000);
            console.error(error);
        }
    } else {
        exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000);
    }
};


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
 
// API para listar eventos 
async function carregarEventos() {
    const eventosEndpoint = '/cadastrar';
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const container = document.querySelector('#eventosContainer');
        container.innerHTML = ''; // Limpa os eventos anteriores (caso existam)

        eventos.forEach(evento => {
            const card = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${evento.urlLogo || 'https://via.placeholder.com/300'}" 
                             class="card-img-top" alt="${evento.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${evento.nome}</h5>
                            <p class="card-text">${evento.descricao}</p>
                            <p class="card-text">
                                <small class="text-muted">Data: ${formatarDataDDMMYYYY(evento.dataInicio)}</small>
                            </p>
                            <a href="${evento.urlSite || '#'}" class="btn btn-primary">Saiba Mais</a>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarEventos());

async function carregarEventosOrdenados() {
    const eventosOrdenadosEndpoint = '/eventosOrdenados';
    const URLCompleta = `${protocolo}${baseURL}${eventosOrdenadosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const container = document.querySelector('#eventosOrganizados'); 
        container.innerHTML = ''; 

        eventos.forEach(evento => {
            const card = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${evento.urlLogo || 'https://via.placeholder.com/300'}" 
                             class="card-img-top" alt="${evento.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${evento.nome}</h5>
                            <p class="card-text">${evento.descricao}</p>
                            <p class="card-text">
                                <small class="text-muted">Data: ${formatarDataDDMMYYYY(evento.dataInicio)}</small>
                            </p>
                            <a href="${evento.urlSite || '#'}" class="btn btn-primary">Saiba Mais</a>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos ordenados:', error);
    }
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEventosOrdenados);




