class prestamosPage {
    btnPrimerPrestamo(){
        return 'button:contains(Primer préstamo)'
      }
    typeDni(dni) {
        cy.get('label')
        .contains('DNI*')
        .parent()
        .find('input').click().type(dni)
      }
      typeTelefono(telefono) {
        cy.get('label')
        .contains('Ingresá tu celular*')
        .parent()
        .find('input').click().type(telefono)
      }
      selectBanco(banco) {
        cy.get('label')
          .contains('Banco*')
          .parent()
          .find('input')
          .click() 
          .type(banco) 
          .get('[class="truncate"]') 
          .contains(banco)
          .click(); 
      }
      typeFechaNacimiento(fecha) {
        cy.get('label')
        .contains('Fecha de nacimiento*')
        .parent()
        .find('input').click().type(fecha)
      }
      typeEmail(email) {
        cy.get('label')
        .contains('Ingresá tu email*')
        .parent()
        .find('input').click().type(email)
      }
      checkTerminosCondiciones() {
        return 'input[type="checkbox"]'
      }
      btnContinuar(){
        return 'button:contains(Continuar)'
      }
      btnContinuarLast(){
        return 'button:contains(Continuar):last()'
      }
      btnCheckNombre(nombre){
        return '.w-full [role="radio"]:contains(' + nombre + ')'
      }
      btnContinuarAlSitoWebLast(){
        return 'button:contains(Continuar al sitio web)'
      }
      ///////////////////////ASSERT TEXT
      anuncioText(){
        return "h1"
      }
      tituloFormularioText(){
        return ".text-xl"
      }
      tuDatosText(){
        return ".flex-col > .gap-1 > .font-bold"
      }
      numeroInfoText(){
        return ".space-y-3 > :nth-child(3)"
      }
      bancoInfoText(){
      return ".space-y-3 > :nth-child(5)"
    }
    terminosYcondicionesText(){
        return ".pl-2 > .leading-tight"
      }
      tituloCheckText(){
        return '.relative > .text-black'
      }
      dniCheckText(){
        return '.overflow-y-auto > :nth-child(1) > .text-gray-900'
      }
      mensajeAlertText(){
        return '.max-w-md'
      }
      titulosMovilText(){
        return "#hero.text-black"
      }
}
export default new prestamosPage();