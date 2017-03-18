$('#botao-frase').click(fraseAleatoria)

function fraseAleatoria() {
    $('#spinner').toggle();
    $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    // Em caso de falha, a seguinte funcao sera chamada
    .fail(function() {
        $('#erro').toggle()
        setTimeout(function() {
            $('#erro').toggle()
        }, 1500)
    })
    // Sempre executara, mesmo quando for falha ou sucesso
    .always(function() {
        $('#spinner').toggle();
    })
}

function trocaFraseAleatoria(data) {
    let posAleatoria =  Math.floor(Math.random() * data.length)
    $('#botao-frase').attr('disabled', true)
    console.log(data, posAleatoria);
    $('.frase').text(data[posAleatoria].texto)
    atualizaTamanhoFrase(data[posAleatoria].texto.length)
    atualizaTempoInicial(data[posAleatoria].tempo)
}
