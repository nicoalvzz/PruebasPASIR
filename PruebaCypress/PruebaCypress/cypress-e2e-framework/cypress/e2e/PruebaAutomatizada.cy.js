describe('Prueba de búsqueda en Renfe', () => {
  it('Debe realizar una búsqueda de trenes desde Madrid a Málaga', () => {
    // Visito la página de Renfe
    cy.visit('https://www.renfe.com/es/es');

    // Espero a que la página cargue completamente
    cy.wait(5000);

    // Acepto cookies si el botón está presente
    cy.get('body').then(($body) => {
      if ($body.find('button#onetrust-accept-btn-handler').length > 0) {
        cy.get('button#onetrust-accept-btn-handler').click();
      }
    });

    // Hago clic en el botón de origen
    cy.get('button#origin')
      .should('be.visible')
      .click();

    // Espero a que el input de origen aparezca y escribir "Madrid"
    cy.get('input#origin')
      .should('be.visible')
      .clear({ force: true })
      .type('Madrid', { force: true, delay: 200 });

    // Selecciono "MADRID (TODAS)" de la lista desplegable
    cy.get('li[id^="awesomplete_list_1_item"]')
      .first() // Selecciono el primer resultado que aparezca
      .click({ force: true });

    // Hago clic en el botón de destino
    cy.get('button#destination')
      .should('be.visible')
      .click();

    // Espero a que el input de destino aparezca y escribir "Ma" para que se muestre Málaga, esto lo he tenido que escribir porque 
    // Málaga al tener tilde se me decodifica y no me la encuentra
    cy.get('input#destination')
      .should('be.visible')
      .clear({ force: true })
      .type('Ma', { force: true, delay: 200 });

    // Selecciono el destino con los caracteres mal codificado
    cy.get('li[id^="awesomplete_list_2_item_0"]')
      .contains('Mï¿½LAGA') // Uso el texto con los caracteres mal codificados
      .contains('MARï¿½A ZAMBRANO') // También mantengo la codificación incorrecta
      .click({ force: true });

    // Selecciono la fecha de ida (28 de abril 2025)
    cy.get('input#first-input')
      .should('be.visible')
      .click({ force: true }); // Fuerzo el clic para abrir el selector de fechas

    // Espero un poco antes de interactuar con el calendario
    cy.wait(1000);

    // Hago clic en el día 28 de abril 2025 usando el atributo 'data-time'
    cy.get('div.lightpick__day[data-time="1745791200000"]')
      .click(); // Hacemos clic en el día 28 de abril

    // Espero un poco antes de seleccionar el día de vuelta
    cy.wait(500);

    // Hago clic en el día 30 de abril 2025 usando el atributo 'data-time'
    cy.get('div.lightpick__day[data-time="1745964000000"]')
      .click(); // Hago clic en el día 30 de abril

    //Aquí me he quedado no he podido seguir simplemente porque no me sale el botón de aceptar y no he encontrado el modo de seguir con la prueba.

  });
});
