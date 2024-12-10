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
    let alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('d-none');
    }, timeout);
}

// Função para carregar eventos com redirecionamento específico
async function carregarEventos() {
    const eventosEndpoint = '/eventosOrdenados';
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const container = document.querySelector('#eventosContainer'); // Elemento onde os cards serão inseridos
        container.innerHTML = ''; // Limpa os eventos anteriores

        eventos.forEach(evento => {
            // Define a página correta com base no tipo do evento
            let pagina = '';
            if (evento.tipo === "numanice") pagina = "indexEventoEspecifico.html";
            else if (evento.tipo === "glow") pagina = "indexEventoEspecificoGlow.html";
            else pagina = "indexEventoEspecifico3.html";

            // Monta o card do evento
            const card = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${evento.urlLogo || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${evento.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${evento.nome}</h5>
                            <p class="card-text">${evento.descricao}</p>
                            <p class="card-text">
                                <small class="text-muted">Data: ${formatarDataDDMMYYYY(evento.dataInicio)}</small>
                            </p>
                            <a href="${pagina}" class="btn btn-primary">Saiba Mais</a>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
    }
}

// Carrega os eventos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEventos);

// API de Login
const fazerLogin = async () => {
    const emailLoginInput = document.querySelector('#emailLoginInput');
    const senhaLoginInput = document.querySelector('#senhaLoginInput');
    const emailLogin = emailLoginInput.value;
    const senhaLogin = senhaLoginInput.value;

    if (emailLogin && senhaLogin) {
        try {
            const URLCompleta = `${protocolo}${baseURL}/loginUsuario`;
            const response = await axios.post(URLCompleta, { email: emailLogin, senha: senhaLogin });

            localStorage.setItem('token', response.data.token);
            emailLoginInput.value = '';
            senhaLoginInput.value = '';
            exibirAlerta('.alert-modal-login', "Usuário logado com sucesso!",
                ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000);
            ocultarModal('#modalLogin', 2000);

            document.querySelector('#loginLink').innerHTML = "Perfil";
        } catch (error) {
            exibirAlerta('.alert-modal-login', 'Falha no login', ['show', 'alert-danger'], ['d-none'], 2000);
        }
    } else {
        exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none'], 2000);
    }
};

// Cadastro de Usuário
async function cadastrarUsuario() {
    const nomeCadastro = document.querySelector('#nomeCadastroInput').value;
    const emailCadastro = document.querySelector('#emailCadastroInput').value;
    const senhaCadastro = document.querySelector('#senhaCadastroInput').value;
    const confirmarSenha = document.querySelector('#confirmarSenhaCadastroInput').value;

    if (nomeCadastro && emailCadastro && senhaCadastro && confirmarSenha) {
        try {
            const URLCompleta = `${protocolo}${baseURL}/cadastroUsuario`;
            await axios.post(URLCompleta, { nome: nomeCadastro, email: emailCadastro, senha: senhaCadastro, confirmarSenha });

            exibirAlerta('.alert-cadastro', "Usuário cadastrado com sucesso!",
                ['show', 'alert-success'], ['d-none'], 2000);
        } catch (error) {
            exibirAlerta('.alert-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none'], 2000);
        }
    } else {
        exibirAlerta('.alert-cadastro', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none'], 2000);
    }
}

// Redirecionamento com base no login
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#authLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        window.location.href = token ? 'cadastroEventos.html' : 'login.html';
    });

    document.querySelector('#loginLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });

    document.querySelector('#cadastroLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'cadastro.html';
    });

    document.querySelector('#logo-link')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
