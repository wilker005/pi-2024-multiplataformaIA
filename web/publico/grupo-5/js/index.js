async function obterEventos() {
    const eventosEndpoint = '/evento'; // Endpoint para buscar eventos
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`; // URL completa para a requisição

    try {
        // Faz a requisição GET para obter os eventos
        const eventos = (await axios.get(URLCompleta)).data;

        // Seleciona o container onde os eventos serão exibidos
        const eventosContainer = document.querySelector('#eventosContainer');

        // Limpa os eventos anteriores (caso haja dados antigos)
        eventosContainer.innerHTML = '';

        // Itera sobre os eventos recebidos do servidor
        for (let evento of eventos) {
            // Cria um novo "col-md-6 mb-3" para o evento
            let coluna = document.createElement('div');
            coluna.classList.add('col-md-6', 'mb-3');

            // Cria a imagem para o evento
            let imagem = document.createElement('img');
            imagem.classList.add('img-fluid');
            imagem.src = evento.urlImagem; // URL da imagem do evento
            imagem.alt = evento.nome; // Nome do evento como texto alternativo

            // Adiciona a imagem ao elemento da coluna
            coluna.appendChild(imagem);

            // Adiciona a coluna ao container de eventos
            eventosContainer.appendChild(coluna);
        }
    } catch (error) {
        console.error("Erro ao obter os eventos:", error);
        alert("Erro ao carregar os eventos. Tente novamente mais tarde.");
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', obterEventos);