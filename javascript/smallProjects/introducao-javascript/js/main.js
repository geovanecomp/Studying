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
        bmi.textContent = (weight/ (height * height)).toFixed(2)
    } else {
        bmi.textContent = 'Invalid values'
        patients[i].classList.add('invalid-pacient')
    }

}
