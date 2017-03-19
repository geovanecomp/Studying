$('#botao-frase').click(fraseAleatoria)
$('#botao-frase-id').click(buscaFrase)


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


function buscaFrase() {
    $('#spinner').toggle();
    let fraseId = $('#frase-id').val()
    console.log(fraseId);
    // Parametros que devem ser enviados como objetos
    let dados = {
        id: fraseId
    }
    $.get('http://localhost:3000/frases', dados, trocaFrase)
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


function trocaFrase(data) {
    $('.frase').text(data.texto)
    atualizaTamanhoFrase(data.texto.length)
    atualizaTempoInicial(data.tempo)
}


// Buscando tudo e filtrando via javascript
// function buscaFrase() {
//     $('#spinner').toggle();
//     $.get('http://localhost:3000/frases', function(resposta) {
//         let id = parseInt($('#frase-id').val())
//
//         for (var i = 0; i < resposta.length; i++) {
//             console.log(resposta[i], id);
//             if(resposta[i]._id === id){
//                 $('.frase').text(resposta[i].texto)
//             }
//         }
//
//     })
//     .fail(function() {
//         $('#erro').toggle()
//         setTimeout(function() {
//             $('#erro').toggle()
//         }, 1500)
//     })
//     // Sempre executara, mesmo quando for falha ou sucesso
//     .always(function() {
//         $('#spinner').toggle();
//     })
// }
