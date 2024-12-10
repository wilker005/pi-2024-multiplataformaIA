const protocolo = 'http://';
const baseURL = 'localhost:3000';

function formatarDataDDMMYYYY(data) {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Exibe alertas na interface
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML

    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('d-none');
    }, timeout);
}

// Função para carregar eventos com redirecionamento específico
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
 
// API para listar eventos 
async function carregarEventos() {
    const eventosEndpoint = '/eventosRecentes';
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const container = document.querySelector('#eventosContainer');
        // container.innerHTML = '';

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
        // container.innerHTML = ''; 

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

 document.addEventListener("DOMContentLoaded", () => {
    const authLink = document.querySelector('#authLink');

    authLink.addEventListener('click', (e) => {
        e.preventDefault(); 

        const token = localStorage.getItem('token');
        
        if (token) {
            window.location.href = 'cadastroEventos.html';
        } else {
            window.location.href = 'login.html';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#loginLink");

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();

        window.location.href = "login.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#cadastroLink");

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();

        window.location.href = "cadastro.html";
    });
});

document.getElementById('logo-link').addEventListener('click', function () {
    window.location.href = 'index-03.html';
});

async function carregarCarrossel() {
    const eventosEndpoint = '/eventosCarrossel';
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');

        carouselInner.innerHTML = ''; // Limpa itens existentes
        carouselIndicators.innerHTML = ''; // Limpa indicadores existentes

        eventos.forEach((evento, index) => {
            const activeClass = index === 0 ? 'active' : '';

            // Adiciona os indicadores
            const indicator = `
                <button type="button" data-bs-target="#carouselExampleIndicators" 
                    data-bs-slide-to="${index}" 
                    class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}">
                </button>`;
            carouselIndicators.insertAdjacentHTML('beforeend', indicator);

            // Adiciona os itens do carrossel
            const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img src="${evento.urlLogo || 'https://via.placeholder.com/800x500'}" 
                         class="d-block w-100" alt="${evento.nome}" height="500">
                </div>`;
            carouselInner.insertAdjacentHTML('beforeend', carouselItem);
        });
    } catch (error) {
        console.error('Erro ao carregar carrossel:', error);
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCarrossel);
