function inserePlacar() {
    let usuario = novoUsuario()
    let corpoTabela = $('.placar').find('tbody')
    let numPalavras = $('#contador-palavras').text()

    let linha = novaLinha(usuario)

    corpoTabela.append(linha)
    linha.find('.botao-remover').click(removeLinha)

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
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete')

    link.append(icone);

    colunaRemover.append(link)

    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover)


    console.log(linha)

    return linha

}

function removeLinha(event) {
    event.preventDefault()
    $(this).parent().parent().remove()
}

$('.botao-remover').click(removeLinha);
