// Para selecionar elemento no html
// $ é um atalho para a funçao jQuery
let tempoInicial = $('#tempo-digitacao').text()
let campo = $('.campo-digitacao')

$(document).ready(function() {
    atualizaTamanhoFrase()
    inicializaContadores()
    inicializaCronometro()
    inicializaMarcadores()
    atualizaPlacar()    
    $('#botao-reiniciar').click(reiniciaJogo)
})

function atualizaTempoInicial(tempo) {
    $('#tempo-digitacao').text(tempo)
    tempoInicial = tempo
}

function atualizaTamanhoFrase() {
    let frase = $('.frase').text()
    let numPalavras = frase.split(' ').length
    let tamanhoFrase = $('#tamanho-frase')

    tamanhoFrase.text(numPalavras)
}

function inicializaContadores () {
    campo.on('input', function() {
        let conteudo = campo.val()
        let qtdPalavras = conteudo.split(/\S+/).length -1
        let qtdCaracteres = conteudo.length

        $('#contador-palavras').text(qtdPalavras)
        $('#contador-caracteres').text(qtdCaracteres)

    })
}

function inicializaCronometro () {
    let tempoRestante = $('#tempo-digitacao').text()

    campo.one('focus', function() {
        let cronometroId = setInterval(function() {
            $('#tempo-digitacao').text(--tempoRestante)
            if (tempoRestante <= 0) {
                clearInterval(cronometroId)
                finalizaJogo()
            }
        }, 1000)
    })
}

function finalizaJogo() {
    campo.attr('disabled', true)
    campo.toggleClass('campo-desativado')
    inserePlacar()
}


function inicializaMarcadores() {
    campo.on('input', function() {
        let frase = $('.frase').text()
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length)
        let estaCorreto = (frase.startsWith(digitado))
        campo.toggleClass('borda-verde', estaCorreto)
        campo.toggleClass('borda-vermelha', !estaCorreto)
    })
}

function reiniciaJogo() {
    campo.attr('disabled', false)
    campo.val('')
    $('#contador-caracteres').text(0)
    $('#contador-palavras').text(0)
    $('#tempo-digitacao').text(tempoInicial)
    campo.toggleClass('campo-desativado')
    campo.removeClass('borda-vermelha')
    campo.removeClass('borda-verde')
    inicializaCronometro()
}
