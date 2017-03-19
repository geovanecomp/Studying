$('.botao-remover').click(removeLinha)
$('#botao-placar').click(mostraPlacar)
$('#botao-sync').click(sincronizaPlacar)

function inserePlacar() {
    let usuario = novoUsuario()
    let corpoTabela = $('.placar').find('tbody')
    let numPalavras = $('#contador-palavras').text()

    let linha = novaLinha(usuario)

    corpoTabela.append(linha)
    linha.find('.botao-remover').click(removeLinha)

    $('.placar').slideDown(500)
    scrollPlacar()

}

function scrollPlacar () {
    // offset retorna um objeto com a posicao do elemento
    let posicaoPlacar = $('.placar').offset().top

    $('.body').animate({
        scrollTop: posicaoPlacar+200+'px'
    }, 1000)
}

function novoUsuario() {
    let usuario = {
        nome: $('#nome').val(),
        palavrasDigitadas: $('#contador-palavras').text()
    }
    return usuario
}

function novaLinha(usuario){
    let linha = $('<tr>')
    let colunaUsuario = $('<td>').text(usuario.nome)
    let colunaPalavras = $('<td>').text(usuario.palavrasDigitadas)
    let colunaRemover = $('<td>');

    let link = $('<a>').addClass('botao-remover').attr('href', '#')
    let icone = $('<i>').addClass('material-icons').text('delete')

    link.append(icone);

    colunaRemover.append(link)

    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover)

    return linha

}

function removeLinha(event) {
    event.preventDefault()
    let linha = $(this).parent().parent()
    // fadeOut vai mudando a opacidade até 'sumir' (display: none)
    // tambem existem o fadeIn e o fadeToogle
    linha.fadeOut(500)
    setTimeout(function() {
        linha.remove()
    }, 500)

}

function mostraPlacar(){
    // toggle mostra ou esconde automaticamente
    // $('.placar').toggle()

    // slideToogle descera ou subira de maneira suave
    $('.placar').slideToggle(600)
}

function sincronizaPlacar() {
    let placar = []
    // Todas as linhas que sao filhas diretas de tbody
    let linhas = $('tbody>tr')
    linhas.each(function() {
        // Obtendo os filhos atraves do seletor css
        let usuario = $(this).find('td:nth-child(1)').text()
        let palavras = $(this).find('td:nth-child(2)').text()

        let score = {
            usuario: usuario,
            pontos: palavras
        }

        placar.push(score)
    })

    let dados = {
        placar: placar
    }

    $.post('http://localhost:3000/placar', dados, function() {
        console.log('Salvando log no servidor');
    })
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', function(data){
        console.log(data);
        $(data).each(function() {
            let usuario = {
                nome: this.usuario,
                palavrasDigitadas: this.pontos
            }
            let linha = novaLinha(usuario)
            linha.find('.botao-remover').click(removeLinha)
            $('tbody').append(linha)
        })
    })
}
