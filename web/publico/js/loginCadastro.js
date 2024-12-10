const protocolo = 'http://'
const baseURL = 'localhost:3000'

const fazerLogin = async () => {
    const emailLoginInput = document.querySelector('#emailLoginInput');
    const senhaLoginInput = document.querySelector('#senhaLoginInput');
    const emailLogin = emailLoginInput.value;
    const senhaLogin = senhaLoginInput.value;

    if (emailLogin && senhaLogin) {
        try {
            const loginEndpoint = '/loginUsuario';
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`;
            const response = await axios.post(URLCompleta, { email: emailLogin, senha: senhaLogin });
            
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token'))
            
            emailLoginInput.value = '';
            senhaLoginInput.value = '';

            exibirAlerta('.alert', "Usuário logado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000);

        } catch (error) {
            exibirAlerta('.alert', 'Falha no login', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000);
            console.error(error);
        }
    } else {
        exibirAlerta('.alert', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000);
    }
};

function validarESalvar() {
    const senhaValida = verificarSenha();

    if (senhaValida) {
        cadastrarUsuario();
    }
}

function verificarSenha() {
    const senhaInput = document.getElementById("senhaCadastroInput").value;
    const confirmarSenhaInput = document.getElementById("confirmarSenhaCadastroInput").value;
    const mensagemErro = document.getElementById("mensagemErro");

    const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!senhaInput || !confirmarSenhaInput) {
        mensagemErro.innerHTML = "Por favor, preencha os campos de senha.";
        return false;
    }

    if (!regexSenhaForte.test(senhaInput)) {
        mensagemErro.innerHTML = `
            A senha deve conter:<br>
            - No mínimo 8 caracteres<br>
            - Pelo menos 1 letra maiúscula<br>
            - Pelo menos 1 letra minúscula<br>
            - Pelo menos 1 número<br>
            - Pelo menos 1 símbolo especial (@$!%*?&).
        `;
        return false;
    }

    if (senhaInput !== confirmarSenhaInput) {
        mensagemErro.textContent = "As senhas não coincidem. Por favor, verifique.";
        return false;
    }

    mensagemErro.textContent = "";
    return true;
}

async function cadastrarUsuario() {
    let nomeCadastroInput = document.querySelector('#nomeCadastroInput')
    let emailCadastroInput = document.querySelector('#emailCadastroInput')
    let senhaCadastroInput = document.querySelector('#senhaCadastroInput')
    let confirmarSenhaCadastroInput = document.querySelector('#confirmarSenhaCadastroInput')
    let nomeCadastro = nomeCadastroInput.value
    let emailCadastro = emailCadastroInput.value
    let senhaCadastro = senhaCadastroInput.value
    let confirmarSenha = confirmarSenhaCadastroInput.value

    if (nomeCadastro && senhaCadastro && senhaCadastro && confirmarSenha) {
        try {
            const cadastroEndpoint = '/cadastroUsuario'
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLCompleta,
                {
                    nome: nomeCadastro,
                    email: emailCadastro,
                    senha: senhaCadastro,
                    confirmarSenha: confirmarSenha
                }
            )
            nomeCadastroInput.value = ""
            emailCadastroInput.value = ""
            senhaCadastroInput.value = ""
            confirmarSenhaCadastroInput.value = ""
            
            exibirAlerta('.alert', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
        }
        catch (error) {
            exibirAlerta('.alert', "Erro ao cadastrar usuário", ['show','alert-danger'], ['d-none', 'alert-success'], 2000)
            console.log(error)
        }
    }
    else {
        exibirAlerta('.alert', 'Preencha todos os campos', ['show','alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML

    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}

function ocultarModal(seletor, timeout){
    setTimeout(() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
    }, timeout)
}