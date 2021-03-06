function validateWeight(weight) {

    if (weight <= 0 || weight >= 300 || weight.length === 0) {
        return false
    }

    return true
}
function validateHeight(height) {

    if (height <= 0 || height >= 3 || height.length === 0) {
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
