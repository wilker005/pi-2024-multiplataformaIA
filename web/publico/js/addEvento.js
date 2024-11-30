async function postEvent() {
     // Constrói a URL completa para o endpoint
     const eventosEndpoint = '/eventos';  // Endpoint onde os eventos são cadastrados
     const URLCompleta = `http://localhost:3000${eventosEndpoint}`; // URL completa com base no domínio atual
 
     // Captura os valores dos campos do formulário
     let nomeEventoInput = document.querySelector('#nomeEvento');
     let dataInicioInput = document.querySelector('#dataInicio');
     let categoriaInput = document.querySelector('#categoria');
     let descricaoInput = document.querySelector('#descricao');
     let bannerInput = document.querySelector('#banner');
     let precoIngressoInput = document.querySelector('#precoIngresso');
     let organizadorInput = document.querySelector('#organizador');
     let estadoInput = document.querySelector('#estado');
     let cidadeInput = document.querySelector('#cidade');
     let enderecoInput = document.querySelector('#endereco');
 
     // Captura os valores dos campos
     let nome = nomeEventoInput.value;
     let data_inicio = dataInicioInput.value;
     let categoria = categoriaInput.value;
     let descricao = descricaoInput.value;
     let url_logo = bannerInput.value;
     let preco = parseFloat(precoIngressoInput.value);
     let organizador = organizadorInput.value;
     let estado = estadoInput.value;
     let cidade = cidadeInput.value;
     let endereco = enderecoInput.value;
 
     // Verifica se todos os campos estão preenchidos corretamente
     if (nome && data_inicio && categoria && descricao && url_logo && preco >= 0 && organizador && estado && cidade && endereco) {
 
         // Limpa os campos do formulário após o envio
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
 
         // Envia os dados para o servidor via POST
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
             });
 
             // Obtém a lista atualizada de eventos após o cadastro
             const eventos = response.data;
 
             // Aqui você pode manipular os dados, como exibir os eventos cadastrados, se necessário
             // Exemplo de manipulação (por exemplo, atualizar a tabela de eventos)
             console.log(eventos); // Para depuração
 
             // Exibe um alerta de sucesso
             exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso', ['show', 'alert-success'], ['d-none'], 2000);
             
         } catch (error) {
             // Caso ocorra um erro ao cadastrar
             console.error(error);
             exibirAlerta('.alert-evento', 'Erro ao cadastrar evento', ['show', 'alert-danger'], ['d-none'], 2000);
         }
 
     } else {
         // Caso algum campo não esteja preenchido corretamente
         exibirAlerta('.alert-evento', 'Preencha todos os campos corretamente', ['show', 'alert-danger'], ['d-none'], 2000);
     }
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    //... é o spread operator
    //quando aplicado a um array, ele "desmembra" o array
    //depois disso, passamos os elementos do array como argumentos para add e
    // remove
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}