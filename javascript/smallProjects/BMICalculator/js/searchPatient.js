// This file is only a example of how do a ajax request

let searchButton = document.querySelector('#search-patients')

searchButton.addEventListener('click', function(){
    console.log('Searching patients...')
    var xhr = new XMLHttpRequest();

    // Open the request
    xhr.open('GET', 'http://api-pacientes.herokuapp.com/pacientes')

    xhr.addEventListener('load', function(){
        // if ok
        if (xhr.status === 200) {
            let response = this.responseText

            // Transforming a JSON in javascript object
            let patients = JSON.parse(response)

            patients.forEach(function(patient){
                console.log(patient)
                addPatientIntoTable(patient)
            })
        } else {
            console.log(xhr.status)
            console.log(xhr.responseText)
        }

    })

    xhr.send()
})
