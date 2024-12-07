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
    const eventoEndpoint = `/eventos/${eventoId}`; // Endpoint para buscar um evento pelo ID
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