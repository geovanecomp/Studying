let filterName = document.querySelector('#table-filter')
filterName.addEventListener('input', function() {
    let patients = document.querySelectorAll('.patient')

    if (this.value.length > 0) {
        patients.forEach(function(patient){
            let name = patient.querySelector('.info-name')
            let regularExpression = new RegExp(this.value, 'i')
            if (regularExpression.test(name.textContent)) {
                patient.classList.remove('hide')
            } else{
                patient.classList.add('hide')
            }
        }, this)
    } else {
        patients.forEach(function(patient){
            patient.classList.remove('hide')
        })
    }




})
