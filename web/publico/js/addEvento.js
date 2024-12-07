// Função para enviar o evento
async function postEvent(event) {
    event.preventDefault();  // Previne o recarregamento da página

    const eventosEndpoint = '/eventos';
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`;

    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
        exibirAlerta('warning', 'Você precisa estar logado para criar um evento');
        return;
    }

    // Captura os valores dos campos do formulário
    const nomeEventoInput = document.querySelector('#nomeEvento');
    const dataInicioInput = document.querySelector('#dataInicio');
    const categoriaInput = document.querySelector('#categoria');
    const descricaoInput = document.querySelector('#descricao');
    const bannerInput = document.querySelector('#banner');
    const precoIngressoInput = document.querySelector('#precoIngresso');
    const organizadorInput = document.querySelector('#organizador');
    const estadoInput = document.querySelector('#estado');
    const cidadeInput = document.querySelector('#cidade');
    const enderecoInput = document.querySelector('#endereco');
    const numeroInput = document.querySelector('#numero');

    // Valores
    const nome = nomeEventoInput.value;
    const data_inicio = dataInicioInput.value;
    const categoria = categoriaInput.value;
    const descricao = descricaoInput.value;
    const url_banner = bannerInput.value;
    const preco = parseFloat(precoIngressoInput.value);
    const organizador = organizadorInput.value;
    const estado = estadoInput.value;
    const cidade = cidadeInput.value;
    const endereco = enderecoInput.value;
    const numero = numeroInput.value;

    // Validações
    if (!nome || !data_inicio || !categoria || !descricao || !url_banner || isNaN(preco) || !organizador || !estado || !cidade || !endereco || !numero) {
        exibirAlerta('error', 'Preencha todos os campos corretamente');
        return;
    }

    // Envia os dados para o servidor
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

        // Resposta de sucesso
        console.log(response.data);
        exibirAlerta('success', 'Evento cadastrado com sucesso!');

        // Limpa os campos do formulário
        nomeEventoInput.value = "";
        dataInicioInput.value = "";
        categoriaInput.value = "";
        descricaoInput.value = "";
        bannerInput.value = "";
        precoIngressoInput.value = "";
        organizadorInput.value = "";
        estadoInput.value = "";
        cidadeInput.value = "";
        enderecoInput.value = "";
        numeroInput.value = "";

    } catch (error) {
        console.error(error);
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