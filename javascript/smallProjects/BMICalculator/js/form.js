let addButton = document.querySelector('#add-patient')

addButton.addEventListener('click', function(event) {
    event.preventDefault()
    let form    = document.querySelector('#form-add-patient')

    let patient = createPatient(form)
    let errors = patientValidate(patient)
    if (errors.length > 0) {
        showErrorsMessages(errors)
        return;
    }

    addPatientIntoTable(patient)

    form.reset()

    let ul = document.querySelector('#errors-messages');
    ul.innerHTML = ""


})

function addPatientIntoTable(patient) {
    let patientTr = createTrPatient(patient)

    tablePatients = document.querySelector('#table-patients')

    tablePatients.appendChild(patientTr)
}

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
    patientTr.classList.add('patient')

    patientTr.appendChild(createTd(patient.name.value, 'info-name' ))
    patientTr.appendChild(createTd(patient.weight.value, 'info-weight'))
    patientTr.appendChild(createTd(patient.height.value, 'info-height'))
    patientTr.appendChild(createTd(patient.bodyFat.value, 'info-body-fat'))
    patientTr.appendChild(createTd(patient.bmi, 'info-bmi'))

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
    let errors = []

    if (!validateWeight(patient.weight.value)) {
        // patient.weight.classList.add('invalid-field')
        errors.push('Invalid weight')
        isValid = false
    }

    if (!validateHeight(patient.height.value)) {
        // patient.height.classList.add('invalid-field')
        errors.push('Invalid height')
        isValid = false
    }

    if (patient.bodyFat.value <= 0 || patient.bodyFat.value.length === 0) {
        // patient.bodyFat.classList.add('invalid-field')
        errors.push('Invalid body fat')
    }

    if (patient.name.value.length === 0) {
        // patient.name.classList.add('invalid-field')
        errors.push('Invalid name')
    }


    return errors
}



function showErrorsMessages(errors) {
    let ul = document.querySelector('#errors-messages')

    // Removing old messages
    ul.innerHTML = ""

    errors.forEach(function(error){
        let li = document.createElement('li')
        li.textContent = error
        ul.appendChild(li)
    })
}
