class MerchantsTest{
    constructor() {
      this.title = "MerchantsTest" 
    }

getMerchants(){
    return cy.get('#menu-accordion > :nth-child(5) > .nav-link')
}

getFilterButton(){
    return cy.get('.float-right > :nth-child(2)')
}

getMerchantNumberField(){
    return cy.get('.mt-3 > .col-md-12 > .form-control')
}

getFilterMerchantButton(){
    return cy.get(':nth-child(7) > :nth-child(1) > .btn')
}

getMerchantNumber(){
    return cy.get('tr > :nth-child(1) > a')
}

getCloseFilter(){
    return cy.get('.filter-close > .material-design-icon')
}

getActionsDropdown(){
    return cy.get('#__BVID__144__BV_toggle_')
}

getDetailsOnActionsDropdown(){
    return cy.get('#__BVID__144 > .dropdown-menu > :nth-child(3) > .dropdown-item')
}

getJPYAvaialbleBalance(){
    return cy.get('.col-md-5 > .card > .card-body > .table > tbody > :nth-child(1) > :nth-child(2)')
}
}
module.exports = MerchantsTest