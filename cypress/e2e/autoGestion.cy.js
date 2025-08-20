import autoGestionPage from "../support/pages/autoGestionPage";
import prestamosPage from "../support/pages/prestamosPage";

describe(`Auto Gestion`, () => {
    let datosTST;
    let urlsTST;
    let validacionesTST;

    // Antes de cada prueba, cargamos los datos de fixtures
    beforeEach(() => {
        cy.fixture('datosTST').then(function (datosTSTv) {
            datosTST = datosTSTv;
        });
        cy.fixture('urlsTST').then(function (urlsTSTv) {
            urlsTST = urlsTSTv;
        });
        cy.fixture('validacionesTST').then(function (validacionesTSTv) {
            validacionesTST = validacionesTSTv;
        });
    });

    it('Auto Gestion, Ingreso DNI Fail', () => {

        // Visita la página de auto gestión
        cy.visit(urlsTST.url_auto_gestion);
        cy.checkUrl(urlsTST.url_auto_gestion);

        // Validar textos en la página
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.ingresa_dni);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.vas_a_poder);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.queres_pedir);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.sabias_que);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.mas_te_conocemos);

        // Ingresar el DNI y hacer clic en el botón "Entrar"
        autoGestionPage.typeDni(datosTST.datos_registro.dni_1);
        cy.doClick(autoGestionPage.btnEntrar());

        // Validar mensaje de error para el DNI
        cy.textValidator(autoGestionPage.failDniText(), validacionesTST.home_auto_gestion.fail_dni);
    });

    it('Auto Gestion, Boton Pedir Prestamo, Telefono no registrado', () => {

        // Visita la página de auto gestión
        cy.visit(urlsTST.url_auto_gestion);
        cy.checkUrl(urlsTST.url_auto_gestion);

        // Validar textos en la página
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.ingresa_dni);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.vas_a_poder);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.queres_pedir);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.sabias_que);
        cy.textValidatorContain(autoGestionPage.infText(), validacionesTST.home_auto_gestion.mas_te_conocemos);

        // Hacer clic en el botón para ingresar
        cy.doClick(autoGestionPage.btnIngresaAqui());

        // Cambiar de dominio usando cy.origin() para interactuar en el nuevo dominio
        cy.origin('https://app.waynimovil.ar', { args: { validacionesTST, datosTST } }, ({ validacionesTST, datosTST }) => {

            // Verificar la URL después de redirigir
            cy.location('origin').should('eq', 'https://app.waynimovil.ar');
            cy.location('hash').should('eq', '#/signup');

            // Validar textos en la nueva página
            cy.get('.pa-5', { timeout: 15000 })
                .should('be.visible')
                .and('contain.text', validacionesTST.home.pedi_tu_prestamo_soy_cliente);

            cy.get('.pa-5', { timeout: 15000 })
                .should('be.visible')
                .and('contain.text', validacionesTST.home.en_linea);

            cy.get('.right-container', { timeout: 15000 })
                .should('be.visible')
                .and('contain.text', validacionesTST.home.inicio_secion);

            // Hacer clic en el botón "Ingresar con tu celular"
            cy.get('button:contains(Ingresar con tu celular)', { timeout: 10000 })
                .should('be.visible').and('exist')
                .click();

            // Escribir el teléfono
            cy.scrollTo('top');
            cy.get('input[type="tel"]:last()', { timeout: 10000 })
                .should('be.visible').click()
                .type(datosTST.datos_registro.telefono_1);

            // Validar que el texto del teléfono esté visible
            cy.get(".right-container", { timeout: 10000 })
                .should('be.visible')
                .and('contain.text', validacionesTST.home.datos_telefono);

            // Hacer clic en "Ingresar"
            cy.scrollTo('top');
            cy.get('button:contains(Ingresar):first()', { timeout: 10000 }).click();

            // Validar el mensaje de error
            cy.scrollTo('top');
            cy.get('.v-snack__content', { timeout: 10000 })
                .should('be.visible')
                .and('contain.text', validacionesTST.alert.no_encontro_cliente);
        });
    });
});
