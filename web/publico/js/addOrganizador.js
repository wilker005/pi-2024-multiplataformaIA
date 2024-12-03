async function cadastrarOrganizador() {
    event.preventDefault(); // Evita o reload da página ao clicar no botão

    // URL do endpoint para cadastro do organizador
    const organizadorEndpoint = '/organizador';
    const URLCompleta = `http://localhost:3000${organizadorEndpoint}`;

    // Captura os valores dos campos do formulário
    const nomeOrganizadorInput = document.querySelector('#nomeOrganizador');
    const telefoneInput = document.querySelector('#telefone');
    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');
    const cnpjInput = document.querySelector('#cnpj');
    const logoInput = document.querySelector('#logo');
    const bannerInput = document.querySelector('#banner');
    const estadoInput = document.querySelector('#estado');
    const cidadeInput = document.querySelector('#cidade');
    const enderecoInput = document.querySelector('#endereco');

    // Extrai os valores
    const nome = nomeOrganizadorInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const cnpj = cnpjInput.value.trim();
    const url_logo = logoInput.value.trim();
    const url_banner = bannerInput.value.trim();
    const estado = estadoInput.value.trim();
    const cidade = cidadeInput.value.trim();
    const endereco = enderecoInput.value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome && telefone && email && senha && cnpj && url_logo && url_banner && estado && cidade && endereco) {
        // Limpa os campos do formulário após o envio
        nomeOrganizadorInput.value = '';
        telefoneInput.value = '';
        emailInput.value = '';
        senhaInput.value = '';
        cnpjInput.value = '';
        logoInput.value = '';
        bannerInput.value = '';
        estadoInput.value = '';
        cidadeInput.value = '';
        enderecoInput.value = '';

        try {
            // Envia os dados para o servidor via POST
            const response = await axios.post(URLCompleta, {
                nome,
                telefone,
                email,
                senha,
                cnpj,
                url_logo,
                url_banner,
                estado,
                cidade,
                endereco,
            });

            // Exibe o retorno para depuração
            console.log(response.data);

            // Mostra um alerta de sucesso
            exibirAlerta(
                '.alert-evento',
                'Organizador cadastrado com sucesso!',
                ['show', 'alert-success'],
                ['d-none'],
                2000
            );
        } catch (error) {
            // Trata erros
            console.error(error);
            exibirAlerta(
                '.alert-evento',
                'Erro ao cadastrar organizador. Tente novamente!',
                ['show', 'alert-danger'],
                ['d-none'],
                2000
            );
        }
    } else {
        // Exibe um alerta se algum campo estiver vazio
        exibirAlerta(
            '.alert-evento',
            'Preencha todos os campos corretamente!',
            ['show', 'alert-danger'],
            ['d-none'],
            2000
        );
    }
}

// Função para exibir alertas
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    const alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('d-none');
    }, timeout);
}
