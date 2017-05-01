class HttpService {
    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()

            xhr.open('GET', url)

            /* Estados de xhr
            0: requisicao ainda nao iniciada
            1: conexao com o servidor estabelecida
            2: requisicao recebida
            3: processando requisicao
            4: requisicao conlcuida e a resposta esta pronta
            // Pode acontecer um erro no servidor, e ele me retornar uma resposta valida
            //entao tambem tenho que conferir a resposta dada pelo servidor (status 200)
            */

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        //JSON.parse converte para objetos javascript
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject(xhr.responseText)
                    }
                }
            }
            xhr.send()
        })
    }
}
