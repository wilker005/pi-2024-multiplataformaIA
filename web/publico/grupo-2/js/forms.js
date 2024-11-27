const nome_evento = document.getElementById('nome-evento')
const descricao = document.getElementById('descricao')
const organizador = document.getElementById('organizador')

fetch('http://localhost:3000/eventos', {
        method: "POST",
        body: JSON.stringify({ nome: nome_evento.value, descricao: descricao.value, organizador: organizador.value }),
        mode: "cors",
        cache: "default"
    })
    .then((res) => (res.json()))
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log("Não foi possível fazer a requisição "+err)
    })