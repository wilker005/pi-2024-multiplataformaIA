const showMessage = (messageId, type, text) => {
    const messageElement = document.getElementById(messageId);
    messageElement.className = `alert alert-${type}`;
    messageElement.textContent = text;
    messageElement.classList.remove('d-none');
};

const updateUI = () => {
    const token = localStorage.getItem('token');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLogout = document.getElementById('btnLogout');

    if (token) {
        btnLogin.classList.add('d-none');
        btnSignup.classList.add('d-none');
        btnLogout.classList.remove('d-none');
    } else {
        btnLogin.classList.remove('d-none');
        btnSignup.classList.remove('d-none');
        btnLogout.classList.add('d-none');
    }
};

const handleSubmit = (formId, endpoint, messageId, callback) => {
    const form = document.getElementById(formId);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const response = await axios.post(endpoint, data);

            if (endpoint.includes('/login')) {
                // Salva o token no localStorage ao fazer login
                const { token } = response.data;
                localStorage.setItem('token', token);
                updateUI();
            }

            showMessage(messageId, 'success', 'Operação realizada com sucesso!');
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById(formId.replace('Form', 'Modal'))).hide();
                document.getElementById(messageId).classList.add('d-none');
                form.reset();
                if (callback) callback(); // Chama callback adicional, se fornecido
            }, 3000);
        } catch (error) {
            const errorMessage = error.response?.data?.mensagem || 'Erro ao conectar-se ao servidor.';
            showMessage(messageId, 'danger', errorMessage);
        }
    });
};

// Logout handler
const btnLogout = document.getElementById('btnLogout');
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove o token
    updateUI(); // Atualiza a interface
});

// Inicialização
window.addEventListener('load', () => {
    updateUI(); // Atualiza a interface ao carregar a página
});

const handleCreateEvent = () => {
    const btnCreateEvent = document.getElementById('btnCreateEvent');

    btnCreateEvent.addEventListener('click', (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            // Caso o usuário não esteja logado, exibir alerta e modal de login
            exibirAlerta('.alert-evento', 'Você precisa estar logado para criar um evento', ['show', 'alert-warning'], ['d-none'], 3000);
            
            // Exibir modal de login
            setTimeout(() => {
                const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            }, 1000);
        } else {
            // Redirecionar para a página de criação de evento
            window.location.href = 'addEvento.html';
        }
    });
};

// Inicializar lógica para o botão "Criar Evento"
handleCreateEvent();


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


// Lida com login e cadastro
handleSubmit('loginForm', 'http://localhost:3000/login', 'loginMessage');
handleSubmit('signupForm', 'http://localhost:3000/signup', 'signupMessage');
