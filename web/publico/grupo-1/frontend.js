async function cadastrarEvento() {
    let nomeEventoInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput')
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let estadoInput = document.querySelector('#estadoInput')
    let categoriasInput = document.querySelector('#categoriasInput')

    let nomeEvento = nomeEventoInput.value
    let dataInicio = dataInicioInput.value
    let preco = precoInput.value
    let descricao = descricaoInput.value
    let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let categoria = categoriasInput.value

    if (!nomeEvento || !dataInicio || !preco || !descricao || !urlLogo || !urlSite || !endereco || !cidade || !estado || !categoria) {
        exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        alert('Por favor, preencha todos os campos antes de cadastrar.')
        return
    }

    try {
        const cadastroEndpoint = '/eventos/cadastro';
        const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`;
        
        await axios.post(
                URLCompleta, {
                    nomeEvento: nomeEvento,
                    dataInicio: dataInicio,
                    preco: preco,
                    descricao: descricao,
                    urlLogo: urlLogo,
                    urlSite: urlSite,
                    endereco: endereco,
                    cidade: cidade,
                    estado: estado,
                    categoria: categoria,
                    data_cadastro: new Date() 
                }
            )
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

        exibirAlerta('.alert-modal-cadastro', "Evento cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
        alert('Evento cadastrado com sucesso!')
        ocultarModal('#modalCadastro', 2000) 
    } catch (error) {
        exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar evento", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        alert('Erro ao cadastrar o evento. Por favor, tente novamente.')
        ocultarModal('#modalCadastro', 2000) 
}
}
