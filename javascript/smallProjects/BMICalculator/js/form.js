let addButton = document.querySelector('#add-patient')

addButton.addEventListener('click', function(event) {
    let form    = document.querySelector('#form-add-patient')

    let patient = createPatient(form)

    if (!patientValidate(patient)) {
        console.log('Invalid patient!')
        return
    }
    console.log('aaaaaaaaaaaaaaaaaaaaa')
    let patientTr = createTrPatient(patient)

    tablePatients = document.querySelector('#table-patients')

    tablePatients.appendChild(patientTr)

    form.reset()

    event.preventDefault()
})

function createPatient(form) {
    let patient = {
        name    : form.name,
        weight  : form.weight,
        height  : form.height,
        bodyFat : form.bodyFat,
        bmi     : bmiCalculator(form.weight.value, form.height.value)
    }

    return patient
}

function createTrPatient(patient) {
    let patientTr   = document.createElement('tr')

    patientTr.appendChild(createTd(patient.name.value, 'info-name' ))
    patientTr.appendChild(createTd(patient.weight.value, 'info-weight'))
    patientTr.appendChild(createTd(patient.height.value, 'info-height'))
    patientTr.appendChild(createTd(patient.bodyFat.value, 'info-body-fat'))
    patientTr.appendChild(createTd(patient.bmi.value, 'info-bmi'))

    return patientTr
}

function createTd(textContent, cssClass) {
    let td = document.createElement('td')
    td.textContent = textContent
    td.classList.add(cssClass)

    return td
}

function patientValidate(patient) {
    let isValid = true
    if (!validateWeight(patient.weight.value)) {
        patient.weight.classList.add('invalid-field')
        isValid = false
    }

    if (!validateHeight(patient.height.value)) {
        patient.height.classList.add('invalid-field')
        isValid = false
    }

    return isValid
}
