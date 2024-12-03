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

async function obterOrganizadores() {
    const organizadoresEndpoint = '/organizadores'; // Endpoint para buscar organizadores
    const URLCompleta = `http://localhost:3000${organizadoresEndpoint}`; // URL completa da API

    try {
        const organizadores = (await axios.get(URLCompleta)).data;
        console.log(organizadores);

        const organizadoresContainer = document.querySelector('#organizadoresContainer');
        organizadoresContainer.innerHTML = ''; // Limpa o container antes de adicionar os elementos

        for (let organizador of organizadores) {
            const logoUrl = organizador.url_logo || 'img/default-logo.png';
            const bannerUrl = organizador.url_banner || 'img/default-banner.jpg';

            if (!organizador.url_logo || !organizador.url_banner) {
                console.warn(`Organizador ${organizador.nome} sem logo ou banner.`);
            }

            // Cria o HTML para cada organizador
            const coluna = document.createElement('div');
            coluna.className = 'col-md-3 mb-4';

            const conteiner = document.createElement('div');
            conteiner.className = 'conteiner-fluid d-flex justify-content-center';

            const caixa = document.createElement('div');
            caixa.className = 'caixa-org d-flex flex-column align-items-center';

            const logo = document.createElement('img');
            logo.className = 'company';
            logo.src = bannerUrl;
            logo.alt = organizador.nome;

            const imgCompany = document.createElement('div');
            imgCompany.className = 'img-company';

            const foto = document.createElement('img');
            foto.className = 'company-photo';
            foto.src = logoUrl;
            foto.alt = organizador.nome;

            imgCompany.appendChild(foto);

            const nome = document.createElement('h5');
            nome.className = 'mt-2';
            nome.textContent = organizador.nome;

            // Monta a estrutura
            caixa.appendChild(logo);
            caixa.appendChild(imgCompany);
            caixa.appendChild(nome);
            conteiner.appendChild(caixa);
            coluna.appendChild(conteiner);
            organizadoresContainer.appendChild(coluna);
        }
    } catch (error) {
        console.error("Erro ao obter os organizadores:", error);
        alert("Erro ao carregar os organizadores. Tente novamente mais tarde.");
    }
}

// Chama as duas funções ao carregar a página
window.onload = function() {
    obterEventos(); // Chama para obter todos os eventos
    obterEventosSP();
    obterOrganizadores(); // Chama para obter eventos de SP
};