async function postEvent(event) {
    event.preventDefault();

    const eventosEndpoint = '/eventos';
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`;

    const token = localStorage.getItem('token');
    if (!token) {
        exibirAlerta('warning', 'Você precisa estar logado para criar um evento');
        return;
    }

    // Decodificar o token para obter o organizador
    let organizador;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Verificar qual campo está presente no payload (login ou nome)
        if (payload.login) {
            organizador = payload.login; // Campo de login no token
        } else if (payload.nome_empresa) {
            organizador = payload.nome_empresa; // Campo de nome da empresa no token
        } else {
            throw new Error("Organizador não encontrado no token");
        }
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        exibirAlerta('error', 'Token inválido. Faça login novamente.');
        return;
    }

    // Capturar outros valores do formulário
    const nome = document.querySelector('#nomeEvento').value;
    const data_inicio = document.querySelector('#dataInicio').value;
    const categoria = document.querySelector('#categoria').value;
    const descricao = document.querySelector('#descricao').value;
    const url_banner = document.querySelector('#banner').value;
    const preco = parseFloat(document.querySelector('#precoIngresso').value);
    const estado = document.querySelector('#estado').value;
    const cidade = document.querySelector('#cidade').value;
    const endereco = document.querySelector('#endereco').value;
    const numero = document.querySelector('#numero').value;

    // Validações
    if (!nome || !data_inicio || !categoria || !descricao || !url_banner || isNaN(preco) || !estado || !cidade || !endereco || !numero) {
        exibirAlerta('error', 'Preencha todos os campos corretamente');
        return;
    }

    // Enviar os dados para o backend
    try {
        const response = await axios.post(URLCompleta, {
            nome,
            data_inicio,
            categoria,
            descricao,
            url_banner,
            preco,
            organizador,
            estado,
            cidade,
            endereco,
            numero
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        exibirAlerta('success', 'Evento cadastrado com sucesso!');
    } catch (error) {
        console.error("Erro ao cadastrar evento:", error);
        exibirAlerta('error', 'Erro ao cadastrar evento');
    }
}

// Função para exibir alertas
function exibirAlerta(tipo, mensagem) {
    Swal.fire({
        icon: tipo, // 'success', 'error', 'warning', 'info', 'question'
        title: mensagem,
        showConfirmButton: false,
        timer: 3000, // Pop-up desaparece automaticamente após 3 segundos
        toast: true, // Exibe no canto superior
        position: 'top-end', // Altere para 'center', 'top', 'bottom', etc., se necessário
    });
}

// Adiciona o evento de submit ao formulário
const formularioEvento = document.querySelector('#formEvento');
formularioEvento.addEventListener('submit', postEvent);