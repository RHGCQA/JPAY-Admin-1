class MerchantsTest {
    constructor() {
        this.title = "MerchantsTest"
    }

    getMerchants() {
        return cy.get('#menu-accordion > :nth-child(5) > .nav-link')
    }

    getFilterButton() {
        return cy.get('.float-right > :nth-child(2)')
    }

    getMerchantNumberField() {
        return cy.get('col-md-12')
    }

    getFilterMerchantButton() {
        return cy.get(':nth-child(7) > :nth-child(1) > .btn')
    }

    getMerchantNumber() {
        return cy.get('.mt-3 > .col-md-12 > .form-control')
    }

    getCloseFilter() {
        return cy.get('.filter-close > .material-design-icon')
    }

    getActionsDropdown() {
        return cy.get('#__BVID__153__BV_toggle_')
    }

    getDetailsOnActionsDropdown() {
        return cy.get('#__BVID__153 > .dropdown-menu > :nth-child(3) > .dropdown-item')
    }

    getIntegrationActionsDropdown() {
        return cy.get('#__BVID__153 > .dropdown-menu > :nth-child(1) > .dropdown-item')
    }

    getJPYAvaialbleBalance() {
        return cy.get('.col-md-5 > .card > .card-body > .table > tbody > :nth-child(1) > :nth-child(2)')
    }

    getIntegrationsAbatchCheckBox() {
        return cy.get('#__BVID__350')

    }

    getIntegrationsSaveButton() {
        return cy.get('#add-integration___BV_modal_footer_ > div > .btn-success')
    }
}

module.exports = MerchantsTest