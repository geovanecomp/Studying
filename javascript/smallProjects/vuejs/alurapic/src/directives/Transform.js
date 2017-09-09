import Vue from 'vue'

// O uso será v-transform
// Vue.directive('transform', {
export default {
  // Chamado sempre que a diretiva for associada ao um elemento do dom
  // elemento do dom, parametro
  bind (el, binding, vnode) {
    let atual = 0
    el.addEventListener('dblclick', () => {

      let incremento = binding.value || 90
      let efeito

      if (!binding.arg || binding.arg === 'rotate') {
        // modifiers é uma proriedade javascript para verificar se existe o atributo
        if (binding.modifiers.reverse) {
          atual -= incremento
        } else {
          atual += incremento
        }

        efeito = `rotate(${atual}deg)`

        if (binding.modifiers.animacao) el.style.transition = 'transform 0.5s'
      } else if (binding.arg === 'scale') {
        efeito = `scale(${incremento})`
      }

      el.style.transform = efeito

    })
    console.log('diretiva associada')
    console.log(el)
  }
}
