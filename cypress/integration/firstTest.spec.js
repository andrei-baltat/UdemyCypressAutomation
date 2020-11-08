///<reference types="cypress" />
// foloseste jquery selector

describe("My first Test", () => {
    it('This is my first test', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // by tag name
        cy.get('input');

        // by ID
        cy.get('#inputEmail1');

        // by Class name
        cy.get('.input-full-width');

        // by Atribute name
        cy.get('[placeholder]');

        // by Atribute name and value
        cy.get('[placeholder="Email"]');

        // by Class value trebuie sa pui toata valoarea
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        // by Tag name Attriute with value
        cy.get('input[placeholder="Email"]');

        // by Two different attributes
        cy.get('[placeholder="Email"][fullwidth]');

        // by TagName atribute with value id and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

        // The most recomended way by cypress, if you can add your tags
        cy.get('[data-cy="imputEmail1"]')
    })

    it('This is my second test', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        /*
        cy.contains('[aici e locatorul]','cauta dupa acest text')
            .parent('')
            .find('')
            .should('contain','ceva text')
            .parent('')
            .find('')
            .click();
        */
    })

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // cauta tagul nb-card si sa aiba inauntru Using the grid text
        //selenium style
        // cy.contains('nb-card','Using the Grid')
        // .find('[for="inputEmail1"]')
        // .should('contain','Email');

        // cy.contains('nb-card','Using the Grid')
        // .find('[for="inputPassword2"]')
        // .should('contain','Password');

        // cy.contains('nb-card','Basic form')
        // .find('[for="exampleInputEmail1"]')
        // .should('contain','Email');

        // cy.contains('nb-card','Basic form')
        // .find('[for="exampleInputPassword1"]')
        // .should('contain','Password');

        // cypress style
        //firstForm este jquery selector si nu poti folosi pe el cypress methods, doar daca ii faci wrap
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            // merge pt ca e jquery locator
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
            expect(emailLabelFirst).to.equal('Email');
            expect(passwordLabelFirst).to.equal('Password');
        })
    })

    it('Invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label).text().to().equal('Email adress');
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email Address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            // salvam atributul
            .invoke('attr', 'class')
            // verificam ca valoarea atributului contine checked
            .should('contain', 'checked');
    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click();
                cy.get('nb-calendar-day-picker')
                    .contains('17')
                    .click();
                // get property    
                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', 'Nov 17, 2020')
            })
    })


    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();


        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then(radioButtons => {
                cy.wrap(radioButtons)
                    .eq(0)
                    .check({ force: true })
                    .should('be.checked');
                cy.wrap(radioButtons)
                    .eq(1)
                    // .check({force: true})    
                    .should('not.be.checked');
                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled');
            })
    })

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        // avem 3 elemente si pe toate 3 le punem pe checked
        // check merge doar cu input types de radio
        cy.get('[type="checkbox"]')
            .check({ force: true })
        cy.get('[type="checkbox"]')
            .uncheck({ force: true })
    })

    it.only('date picker', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date();
        date.setDate(date.getDate() + 50);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleDateString('default', { month: 'short' });

        // cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        //     if (!dateAttribute.includes(futureMonth)) {
        //         cy.get('[data-name="chevron-right"]').click();
        //     } else {
        //         cy.get('nb-calendar-day-picker').contains(futureDay).click();
        //     }
        // })


        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input)
                    .click();
                cy.get('nb-calendar-navigation')
                    .invoke('attr', 'ng-reflect-date')
                    .then(dateAttribute => {
                        if (!dateAttribute.includes(futureMonth)) {
                            cy.get('[data-name="chevron-right"]')
                                .click();
                            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
                                .contains(futureDay).click()
                        } else {
                            cy.get('nb-calendar-day-picker class="day-cell ng-star-inserted"')
                                .contains(futureDay)
                                .click();
                        }
                    })
                // cy.get('nb-calendar-day-picker')
                //     .contains('17')
                //     .click();
                // // get property    
                // cy.wrap(input)
                //     .invoke('prop', 'value')
                //     .should('contain', 'Nov 17, 2020')
            })
    })
})