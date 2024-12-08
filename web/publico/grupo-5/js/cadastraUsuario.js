async function postUser(user) {
    user.preventDefault(); // Evita o reload da página ao clicar no botão

    // URL do endpoint para cadastro do organizador
    const usuarioEndpoint = '/usuario';
    const URLCompleta = `http://localhost:3000${usuarioEndpoint}`;

    // Captura os valores dos campos do formulário
    let nomeInput = document.querySelector('#nome');
    let emailInput = document.querySelector('#email');
    let confirmeEmailInput = document.querySelector('#confirmaEmail');
    let senhaInput = document.querySelector('#senha');
    let confirmeSenhaInput = document.querySelector('#confirmaSenha');
    let telefoneInput = document.querySelector('#telefone');
    let cnpjInput = document.querySelector('#cnpj');
    let cepInput = document.querySelector('#cep');
    let complementoInput = document.querySelector('#complemento');
    let enderecoInput = document.querySelector('#endereco');
    let numeroInput = document.querySelector('#numero');

    // Extrai os valores
    let nome = nomeInput.value;
    let email = emailInput.value;
    let confirmeEmail = confirmeEmailInput.value;
    let senha = senhaInput.value;
    let confirmeSenha = confirmeSenhaInput.value;
    let telefone = telefoneInput.value;
    let cnpj = cnpjInput.value;
    let cep = cepInput.value;
    let complemento = complementoInput.value;
    let endereco = enderecoInput.value;
    let numero = numeroInput.value;
    

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

            const usuarios = response.data;

            exibirAlerta('.alert-usuario', 'usuario cadastrado com sucesso', ['show', 'alert-success'], ['d-none'], 2000);

        } catch (error) {
            console.error(error);
            exibirAlerta('.alert-usuario', 'Erro ao cadastrar usuario', ['show', 'alert-danger'], ['d-none'], 2000);
        }

    } else {
        exibirAlerta('.alert-usuario', 'Preencha todos os campos corretamente', ['show', 'alert-danger'], ['d-none'], 2000);
    }
}

document.getElementById('userForm').addEventListener('submit', postUser);

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor);

    if (alert) {
        alert.innerHTML = innerHTML;
        alert.classList.add(...classesToAdd);
        alert.classList.remove(...classesToRemove);

        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('d-none');
        }, timeout);
    } else {
        console.error("Elemento de alerta não encontrado. Verifique o seletor:", seletor);
    }
}
