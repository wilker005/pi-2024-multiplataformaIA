const protocolo = 'http://'
const baseURL = 'localhost:3000'



//fora de qualquer outra função, pode ser no final, depois de todas
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

function ocultarModal(seletor, timeout){
    setTimeout(() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
    }, timeout)
}
    



async function obterEventos() {
    const eventosEndpoint = '/eventos'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`
    const eventos = (await axios.get(URLCompleta)).data

    let tabela = document.querySelector('.eventos')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let evento of eventos) {
        //insertRow(0) para adicionar sempre na primeira linha
        //se quiser adicionar na última, chame insertRow sem argumentos
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        let celulaAno = linha.insertCell(2)
        let celulaClassificacao = linha.insertCell(3)
        celulaTitulo.innerHTML = evento.nome
        celulaSinopse.innerHTML = evento.sinopse
        celulaAno.innerHTML = evento.ano
        celulaClassificacao.innerHTML = evento.classificacao
    }


    console.log(eventos)
}

async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/cadastrar'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let nomeInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput');
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let estadoInput = document.querySelector('#estadoInput')
    let categoriasInput = document.querySelector('#categoriaInput')
    let dataCadastroValor = new Date()

    //pega os valores digitados pelo usuário
    let nome = nomeInput.value
    let dataInicio = dataInicioInput.value
    let preco = precoInput.value
    let descricao = descricaoInput.value
    let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let categorias = categoriasInput.value
    let dataCadastro = dataCadastroValor.toISOString();

    const dataInicioISO = dataInicio;
            const dataInicioFormatada = new Date(dataInicioISO);

            const dataISO = dataCadastro;
            const data = new Date(dataISO);

            const formatadordatahora = new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            const formatadordata = new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

    if (nome && dataInicio && preco && descricao && urlLogo && urlSite && endereco && cidade && estado && categorias) {

        //limpa os campos que o usuário digitou
        nomeEventoInput.value = ""
        dataInicioInput.value = ""
        precoInput.value = ""
        descricaoInput.value = ""
        urlLogoInput.value = ""
        urlSiteInput.value = ""
        enderecoInput.value = ""
        cidadeInput.value = ""
        estadoInput.value = ""
        categoriasInput.value = ""

        //envia os dados ao servidor (back end)
        const cadastrar = (await axios.post(URLCompleta, {
            nome,
            dataInicio,
            preco, 
            descricao,
            urlLogo,
            urlSite, 
            endereco,
            cidade, 
            estado, 
            categorias,
            dataCadastro
        })).data

        exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso', ['show',
            'alert-success'], ['d-none'], 2000)
                    
    }
    //senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-evento', 'Preencha todos os campos', ['show','alert-danger'], ['d-none'], 2000)
    }
}


 
