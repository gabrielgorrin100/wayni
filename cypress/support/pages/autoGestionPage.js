class autoGestionPage {
    typeDni(dni) {
        cy.get('label')
        .contains('DNI')
        .parent()
        .find('input').click().type(dni)
      }
      btnEntrar(){
        return '[type="submit"]:contains(Entrar)'
      }
      btnIngresaAqui(){
        return '.font-bold:contains("Ingresá aquí")'
      }
      btnIngresaCelular(){
        return 'button:contains(Ingresar con tu celular)'
      }
      typeTelefono() {
        return 'input[type="tel"]:last()'
      }
      btnIngresar(){
        return 'button:contains(Ingresar):first()'
      }
    ///////////////////////ASSERT TEXT
    infText() {
        return ".z-20"
    }
    failDniText() {
        return "div.px-3 > .text-xs"
    }
    promoText() {
        return ".pa-5"
    }
    tituloText() {
        return ".right-container"
    }
    alertNoCliente(){
        return '.v-snack__content'
    }
}
export default new autoGestionPage();