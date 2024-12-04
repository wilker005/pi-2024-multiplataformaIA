const showMessage = (messageId, type, text) => {
    const messageElement = document.getElementById(messageId);
    messageElement.className = `alert alert-${type}`;
    messageElement.textContent = text;
    messageElement.classList.remove('d-none');
};

const handleSubmit = (formId, endpoint, messageId) => {
    const form = document.getElementById(formId);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const response = await axios.post(endpoint, data);
            showMessage(messageId, 'success', 'Operação realizada com sucesso!');
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById(formId.replace('Form', 'Modal'))).hide();
                document.getElementById(messageId).classList.add('d-none');
                form.reset();
            }, 3000);
        } catch (error) {
            const errorMessage = error.response?.data?.mensagem || 'Erro ao conectar-se ao servidor.';
            showMessage(messageId, 'danger', errorMessage);
        }
    });
};

handleSubmit('loginForm', 'http://localhost:3000/login', 'loginMessage');
handleSubmit('signupForm', 'http://localhost:3000/signup', 'signupMessage');
