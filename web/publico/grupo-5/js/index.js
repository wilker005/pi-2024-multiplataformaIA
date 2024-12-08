async function obterEventos() {
    const eventosEndpoint = '/evento'; // Endpoint no backend
    const URLCompleta = `http://localhost:3000${eventosEndpoint}` ; // URL completa para a requisição

    try {
        // Requisição ao backend
        const resposta = await axios.get(URLCompleta);
        const eventos = resposta.data;

        console.log("Eventos recebidos:", eventos); // Para verificar a resposta no console

        // Atualiza o container de eventos
        const eventosContainer = document.querySelector('#eventosContainer');
        eventosContainer.innerHTML = '';

        // Itera pelos eventos e adiciona ao DOM
        for (let evento of eventos) {
            let coluna = document.createElement('div');
            coluna.classList.add('col-md-6', 'mb-3');

            let imagem = document.createElement('img');
            imagem.classList.add('img-fluid');
            imagem.src = evento.url_logo; // URL da imagem
            imagem.alt = evento.nome; // Nome do evento

            imagem.onclick = function() {
                exibirEventoPorId(evento._id); // Passa o ID do evento para a função
            };

            coluna.appendChild(imagem);
            eventosContainer.appendChild(coluna);
        }
    } catch (error) {
        console.error("Erro ao obter os eventos:", error.response?.data || error.message);
        alert("Erro ao carregar os eventos. Verifique sua conexão e tente novamente.");
    }

}

async function exibirEventoPorId(eventoId) {
    const eventoEndpoint = `/evento/${eventoId}`; // Endpoint para buscar um evento pelo ID
    const URLCompleta = `http://localhost:3000${eventoEndpoint}`; // URL completa

    try {
        // Faz a requisição GET para o servidor
        const evento = (await axios.get(URLCompleta)).data;

        // Exibe os detalhes do evento no console (ou use uma página/modal para exibir)
        console.log(evento);

        // Exemplo de exibição em um modal
        const modal = document.querySelector('#eventoModal');
        const modalTitulo = document.querySelector('#modalTitulo');
        const modalDescricao = document.querySelector('#modalDescricao');
        const modalImagem = document.querySelector('#modalImagem');

        modalTitulo.textContent = evento.nome;
        modalDescricao.textContent = evento.descricao;
        modalImagem.src = evento.url_logo;

        // Exibir o modal
        modal.style.display = 'block';
    } catch (error) {
        console.error("Erro ao buscar o evento:", error);
        alert("Erro ao carregar os detalhes do evento.");
    }
}
function fecharModal() {
    const modal = document.querySelector('#eventoModal');
    modal.style.display = 'none';
}


// Garante que a função seja chamada após carregar o DOM
document.addEventListener('DOMContentLoaded', obterEventos);

// Função para verificar se o usuário está logado
function verificarLogin() {
    const token = localStorage.getItem('auth_token');
    
    // Se o token estiver presente, o usuário está logado
    if (token) {
        // Alterar o botão de login para "Sair"
        document.getElementById('entrar').textContent = 'Sair';
        document.getElementById('entrar').onclick = logout;
        
        // Exibir o botão "Criar Evento"
        document.getElementById('criarEvento').classList.remove('d-none');
    } else {
        // Caso contrário, o botão de login aparece como "Entrar"
        document.getElementById('entrar').textContent = 'Entrar';
        document.getElementById('entrar').onclick = mostrarLogin;
        
        // Esconder o botão "Criar Evento"
        document.getElementById('criarEvento').classList.add('d-none');
    }
}

// Função de logout
function logout(event) {
    event.preventDefault();
    localStorage.removeItem('auth_token');
    window.location.reload(); // Recarrega a página para atualizar o estado
}

// Função para mostrar o login (poderia redirecionar para uma página de login ou exibir um modal)
function mostrarLogin(event) {
    event.preventDefault();
    window.location.href = 'login-05.html'; // Ou pode ser um modal de login
}

// Chama a função para verificar o login quando a página carregar
verificarLogin();