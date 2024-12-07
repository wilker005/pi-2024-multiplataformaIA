async function obterEventos() {
    const eventosEndpoint = '/evento'; // Endpoint no backend
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`; // URL completa para a requisição

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

            coluna.appendChild(imagem);
            eventosContainer.appendChild(coluna);
        }
    } catch (error) {
        console.error("Erro ao obter os eventos:", error.response?.data || error.message);
        alert("Erro ao carregar os eventos. Verifique sua conexão e tente novamente.");
    }
}

// Garante que a função seja chamada após carregar o DOM
document.addEventListener('DOMContentLoaded', obterEventos);