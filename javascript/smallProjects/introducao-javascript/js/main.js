function validateWeight(weight) {

    if (weight <= 0 || weight >= 300) {
        return false
    }

    return true
}
function validateHeight(height) {

    if (height <= 0 || height >= 3) {
        return false
    }

    return true
}

function bmiCalculator(weight, height) {
    return (weight / (height * height)).toFixed(2)
}

let patients = document.querySelectorAll('.patient')
let weight  = null
let height  = null
let bmi     = null

for (var i = 0; i < patients.length; i++) {
    // name    = patients[i].querySelector('.info-name').textContent
    weight  = patients[i].querySelector('.info-weight').textContent
    height  = patients[i].querySelector('.info-height').textContent
    bmi     = patients[i].querySelector('.info-bmi')

    if (validateHeight(height) && validateWeight(weight)) {
        bmi.textContent = bmiCalculator(weight, height)
    } else {
        bmi.textContent = 'Invalid values'
        patients[i].classList.add('invalid-pacient')
    }

}

let addButton = document.querySelector('#add-patient')
addButton.addEventListener('click', function(event) {
    let form    = document.querySelector('#form-add-patient')
    let name    = form.name.value
    let weight  = form.weight.value
    let height  = form.height.value
    let bodyFat = form.bodyFat.value

    let patientTr   = document.createElement('tr')
    let nameTd      = document.createElement('td')
    let weightTd    = document.createElement('td')
    let heightTd    = document.createElement('td')
    let bodyFatTd   = document.createElement('td')
    let bmiTd       = document.createElement('td')

    nameTd.textContent      = name
    weightTd.textContent    = weight
    heightTd.textContent    = height
    bodyFatTd.textContent   = bodyFat
    bmiTd.textContent       = bmiCalculator(weight, height)


    patientTr.appendChild(nameTd)
    patientTr.appendChild(weightTd)
    patientTr.appendChild(heightTd)
    patientTr.appendChild(bodyFatTd)
    patientTr.appendChild(bmiTd)

    tablePatients = document.querySelector('#table-patients')

    tablePatients.appendChild(patientTr)


    event.preventDefault()
    console.log(form)
    console.log(name)
    console.log(weight)
    console.log(height)
    console.log(bodyFat)
})
