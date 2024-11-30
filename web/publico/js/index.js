// Função para obter os eventos
async function obterEventos() {
    const eventosEndpoint = '/eventos';  // Endpoint para buscar eventos
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`; // Usando o domínio atual

    try {
        // Faz a requisição GET para o servidor
        const eventos = (await axios.get(URLCompleta)).data;
        console.log(eventos);

        // Inverte a ordem dos eventos para que o último evento adicionado apareça primeiro
        eventos.reverse();  // Agora o último evento será o primeiro

        // Seleciona apenas os 4 primeiros eventos
        const ultimosEventos = eventos.slice(0, 4);

        // Seleciona o container onde os eventos serão exibidos
        const eventosContainer = document.querySelector('#eventosContainer');

        // Limpa os eventos anteriores (caso haja dados antigos)
        eventosContainer.innerHTML = '';

        // Itera sobre os eventos recebidos do servidor (somente os 4 mais recentes)
        for (let evento of ultimosEventos) {
            // Cria um novo "col-md-3 mb-4" para o evento
            let coluna = document.createElement('div');
            coluna.classList.add('col-md-3', 'mb-4');
            
            // Cria a estrutura de "caixa" para o evento
            let caixa = document.createElement('div');
            caixa.classList.add('conteiner-fluid', 'd-flex', 'justify-content-center');

            let caixaInterna = document.createElement('div');
            caixaInterna.classList.add('caixa', 'd-flex', 'flex-column', 'align-items-center');
            
            // Adiciona a imagem do evento
            let imagem = document.createElement('img');
            imagem.classList.add('okt-img');
            imagem.src = evento.url_logo;  // Usando a URL da imagem do evento
            imagem.alt = evento.nome;  // Usando o nome do evento como alt para a imagem

            // Adiciona o título do evento
            let titulo = document.createElement('h5');
            titulo.classList.add('mt-0');
            titulo.innerText = evento.nome;  // Nome do evento

            // Cria o botão "Ver evento"
            let botao = document.createElement('button');
            botao.classList.add('btn', 'btn-danger');
            botao.innerText = 'Ver evento';
            botao.onclick = function() {
                // Ao clicar, redireciona para a página do evento (você pode ajustar o link conforme necessário)
                window.location.href = `/evento/${evento._id}`; // Supondo que cada evento tenha um ID único
            };

            // Adiciona todos os elementos à estrutura da caixa
            caixaInterna.appendChild(imagem);
            caixaInterna.appendChild(titulo);
            caixaInterna.appendChild(botao);
            caixa.appendChild(caixaInterna);
            coluna.appendChild(caixa);
            eventosContainer.appendChild(coluna);
        }
    } catch (error) {
        console.error("Erro ao obter os eventos:", error);
        alert("Erro ao carregar os eventos. Tente novamente mais tarde.");
    }
}

// Função para obter os eventos com estado "SP"
async function obterEventosSP() {
    const eventosEndpoint = '/eventos';  // Endpoint para buscar eventos
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`; // Usando o domínio atual

    try {
        // Faz a requisição GET para o servidor
        const eventos = (await axios.get(URLCompleta)).data;
        console.log(eventos);

        // Filtra os eventos que têm o estado "SP" e inverte a ordem
        const eventosSP = eventos.filter(evento => evento.estado === 'SP').reverse();

        // Seleciona apenas os 4 primeiros eventos de São Paulo
        const ultimosEventosSP = eventosSP.slice(0, 4);

        // Seleciona o container onde os eventos serão exibidos
        const eventosContainerSP = document.querySelector('#eventosContainerSP');

        // Limpa os eventos anteriores (caso haja dados antigos)
        eventosContainerSP.innerHTML = '';

        // Itera sobre os eventos recebidos do servidor (somente os 4 mais recentes)
        for (let evento of ultimosEventosSP) {
            // Cria um novo "col-md-3 mb-4" para o evento
            let coluna = document.createElement('div');
            coluna.classList.add('col-md-3', 'mb-4');
            
            // Cria a estrutura de "caixa" para o evento
            let caixa = document.createElement('div');
            caixa.classList.add('conteiner-fluid', 'd-flex', 'justify-content-center');

            let caixaInterna = document.createElement('div');
            caixaInterna.classList.add('caixa', 'd-flex', 'flex-column', 'align-items-center');
            
            // Adiciona a imagem do evento
            let imagem = document.createElement('img');
            imagem.classList.add('okt-img');
            imagem.src = evento.url_logo;  // Usando a URL da imagem do evento
            imagem.alt = evento.nome;  // Usando o nome do evento como alt para a imagem

            // Adiciona o título do evento
            let titulo = document.createElement('h5');
            titulo.classList.add('mt-0');
            titulo.innerText = evento.nome;  // Nome do evento

            // Cria o botão "Ver evento"
            let botao = document.createElement('button');
            botao.classList.add('btn', 'btn-danger');
            botao.innerText = 'Ver evento';
            botao.onclick = function() {
                // Ao clicar, redireciona para a página do evento (você pode ajustar o link conforme necessário)
                window.location.href = `/evento/${evento._id}`; // Supondo que cada evento tenha um ID único
            };

            // Adiciona todos os elementos à estrutura da caixa
            caixaInterna.appendChild(imagem);
            caixaInterna.appendChild(titulo);
            caixaInterna.appendChild(botao);
            caixa.appendChild(caixaInterna);
            coluna.appendChild(caixa);
            eventosContainerSP.appendChild(coluna);
        }
    } catch (error) {
        console.error("Erro ao obter os eventos com estado SP:", error);
        alert("Erro ao carregar os eventos com estado SP. Tente novamente mais tarde.");
    }
}

// Chama as duas funções ao carregar a página
window.onload = function() {
    obterEventos(); // Chama para obter todos os eventos
    obterEventosSP(); // Chama para obter eventos de SP
};