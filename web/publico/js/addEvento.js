// Função para enviar o evento
async function postEvent() {
    const eventosEndpoint = '/eventos';
    const URLCompleta = `http://localhost:3000${eventosEndpoint}`;

    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
        exibirAlerta('.alert-evento', 'Você precisa estar logado para criar um evento', ['show', 'alert-warning'], ['d-none'], 2000);
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

    // Valores
    const nome = nomeEventoInput.value;
    const data_inicio = dataInicioInput.value;
    const categoria = categoriaInput.value;
    const descricao = descricaoInput.value;
    const url_logo = bannerInput.value;
    const preco = parseFloat(precoIngressoInput.value);
    const organizador = organizadorInput.value;
    const estado = estadoInput.value;
    const cidade = cidadeInput.value;
    const endereco = enderecoInput.value;

    // Validações
    if (!nome || !data_inicio || !categoria || !descricao || !url_logo || isNaN(preco) || !organizador || !estado || !cidade || !endereco) {
        exibirAlerta('.alert-evento', 'Preencha todos os campos corretamente', ['show', 'alert-danger'], ['d-none'], 2000);
        return;
    }

    // Envia os dados para o servidor
    try {
        const response = await axios.post(URLCompleta, {
            nome,
            data_inicio,
            categoria,
            descricao,
            url_logo,
            preco,
            organizador,
            estado,
            cidade,
            endereco
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Resposta de sucesso
        const eventos = response.data;
        console.log(eventos);
        exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso!', ['show', 'alert-success'], ['d-none'], 2000);

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

    } catch (error) {
        console.error(error);
        exibirAlerta('.alert-evento', 'Erro ao cadastrar evento', ['show', 'alert-danger'], ['d-none'], 2000);
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
