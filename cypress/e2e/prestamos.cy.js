import prestamosPage from "../support/pages/prestamosPage"

describe(`Prestamos`, () => {
    let datosTST
    let urlsTST
    let validacionesTST

    beforeEach(() => {
        cy.fixture('datosTST').then(function (datosTSTv) {
            datosTST = datosTSTv
        })
        cy.fixture('urlsTST').then(function (urlsTSTv) {
            urlsTST = urlsTSTv
        })
        cy.fixture('validacionesTST').then(function (validacionesTSTv) {
            validacionesTST = validacionesTSTv
        })
    });
    it('Prestamos, Crear Registro Nuevo Usuario', () => {

        cy.visit(urlsTST.url_prestamos);
        cy.checkUrl(urlsTST.url_prestamos);
        cy.textValidator(prestamosPage.anuncioText(), validacionesTST.home.pedi_tu_prestamo);
        cy.textValidator(prestamosPage.tituloFormularioText(), validacionesTST.home.titulo_formulario);
        cy.textValidator(prestamosPage.tuDatosText(), validacionesTST.home.tus_datos_se_guardan);
        cy.textValidator(prestamosPage.numeroInfoText(), validacionesTST.home.escribi_tu_numero_dato);
        cy.textValidator(prestamosPage.bancoInfoText(), validacionesTST.home.banco_info);
        cy.textValidator(prestamosPage.terminosYcondicionesText(), validacionesTST.home.termino_condiciones);
    
        cy.get(prestamosPage.btnPrimerPrestamo()).click();
        prestamosPage.typeDni(datosTST.datos_registro.dni_1);
        prestamosPage.typeTelefono(datosTST.datos_registro.telefono_1);
        prestamosPage.selectBanco(datosTST.datos_registro.banco_1);
        prestamosPage.typeFechaNacimiento(datosTST.datos_registro.fecha_nacimiento);
        prestamosPage.typeEmail(datosTST.datos_registro.email);
        cy.get(prestamosPage.checkTerminosCondiciones()).click();
        cy.get(prestamosPage.btnContinuar()).click();
    
        // Validar textos después del clic
        cy.textValidator(prestamosPage.tituloCheckText(), validacionesTST.home.como_te_llamas);
        cy.textValidator(prestamosPage.dniCheckText(), "DNI: " + datosTST.datos_registro.dni_1);
    
        // Verificar la selección del banco
        cy.clickCheckOFF(prestamosPage.btnCheckNombre(datosTST.datos_registro.nombre_1));
        cy.get(prestamosPage.btnContinuarLast()).click();
    
        // Esperar el mensaje de error y validarlo
        cy.get(prestamosPage.mensajeAlertText(), { timeout: 10000 })  // Espera que el mensaje esté visible
            .should('be.visible')
            .and('contain.text', validacionesTST.alert.lo_sentimos)
            .and('contain.text', validacionesTST.alert.a_que_se_debe)
            .and('contain.text', validacionesTST.alert.en_waynimovil)
            .and('contain.text', validacionesTST.alert.desafortunadamente);
    
        // Hacer clic para continuar hacia el sitio web
        cy.get(prestamosPage.btnContinuarAlSitoWebLast(), { timeout: 10000 }).click();
        
        cy.origin('https://www.waynimovil.ar', { args: { urlsTST, validacionesTST } }, ({ urlsTST, validacionesTST }) => {
            // Validar la URL después del cambio de dominio
            cy.url({ timeout: 10000 }).should('eq', urlsTST.url_wayni_movil);  // Validar la URL del nuevo dominio
    
            // Validar los textos en la página del nuevo dominio
            cy.get("#hero.text-black", { timeout: 10000 }).should('be.visible').and('contain.text', validacionesTST.homeMovil.tenemos_un_prestamo);
            cy.get("#hero.text-black").should('be.visible').and('contain.text', validacionesTST.homeMovil.ingresa_billetera);
            cy.get("#hero.text-black").should('be.visible').and('contain.text', validacionesTST.homeMovil.pedilo);
            cy.get("#hero.text-black").should('be.visible').and('contain.text', validacionesTST.homeMovil.te_lo_acreditamos);
            cy.get("#hero.text-black").should('be.visible').and('contain.text', validacionesTST.homeMovil.conoce_requisitos);
        });
    
    });
    

})