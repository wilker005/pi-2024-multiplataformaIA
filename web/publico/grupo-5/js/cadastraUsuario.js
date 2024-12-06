async function cadastrarUsuario() {
    event.preventDefault(); // Evita o reload da página ao clicar no botão

    // URL do endpoint para cadastro do organizador
    const usuarioEndpoint = '/usuario';
    const URLCompleta = `http://localhost:3000${usuarioEndpoint}`;

    // Captura os valores dos campos do formulário
    const nomeInput = document.querySelector('#nome');
    const emailInput = document.querySelector('#email');
    const confirmeEmailInput = document.querySelector('#confirmeEmail');
    const senhaInput = document.querySelector('#senha');
    const confirmeSenhaInput = document.querySelector('#confirmeSenha');
    const telefoneInput = document.querySelector('#telefone');
    const cnpjInput = document.querySelector('#cnpj');
    const cepInput = document.querySelector('#cep');
    const complementoInput = document.querySelector('#complemento');
    const enderecoInput = document.querySelector('#endereco');
    const numeroInput = document.querySelector('#numero');

    // Extrai os valores
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const confirmeEmail = confirmeEmailInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmeSenha = confirmeSenhaInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const cnpj = cnpjInput.value.trim();
    const cep = cepInput.value.trim();
    const complemento = complementoInput.value.trim();
    const endereco = enderecoInput.value.trim();
    const numero = numeroInput.value.trim();
    

    // Verifica se todos os campos estão preenchidos
    if (nome && email && confirmeEmail && senha && confirmeSenha && telefone && cnpj && cep && complemento && endereco && numero) {
        // Limpa os campos do formulário após o envio
        nome.value = '';
        email.value = '';
        confirmeEmail.value = '';
        senha.value = '';
        confirmeSenha.value = '';
        telefone.value = '';
        cnpj.value = '';
        cep.value = '';
        complemento.value = '';
        endereco.value = '';
        numero.value = '';

        try {
            // Envia os dados para o servidor via POST
            const response = await axios.post(URLCompleta, {
                nome,
                email,
                confirmeEmail,
                senha,
                confirmeSenha,
                telefone,
                cnpj,
                cep,
                complemento,
                endereco,
                numero,
               
            });

            // Exibe o retorno para depuração
            console.log(response.data);

            // Mostra um alerta de sucesso
            exibirAlerta(
                '.alert-evento',
                'Usuario cadastrado com sucesso!',
                ['show', 'alert-success'],
                ['d-none'],
                2000
            );
        } catch (error) {
            // Trata erros
            console.error(error);
            exibirAlerta(
                '.alert-evento',
                'Erro ao cadastrar usuario. Tente novamente!',
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
