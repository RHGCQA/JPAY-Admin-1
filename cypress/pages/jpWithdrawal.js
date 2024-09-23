class JPWithdrawalTest {
    constructor() {
        this.title = "JPWithdrawalTest"
    }

    getFiatTransactions() {
        return cy.get('#menu-accordion > :nth-child(2) > :nth-child(1)')
    }

    getJPWithdrawals() {
        return cy.get('.slide.show > :nth-child(1) > :nth-child(7)')
    }

    getJPWithdrawalShowFilterMenu() {
        return cy.get('.float-right > a')
    }

    getJPWithdrawalSearchFilter() {
        return cy.get('.input-group-prepend > .form-control')
    }

    getJPWithdrawalSearchField() {
        return cy.get('.input-group > input.form-control')
    }

    getJPWithdrawalFilterButton() {
        return cy.get('.card-footer > .btn-info')
    }

    getJPWithdrawalActionDropdown() {
        return cy.get('#__BVID__112__BV_toggle_')
    }

    getJPWIthdrawalActionAddEdit() {
        return cy.get('#__BVID__112 > .dropdown-menu > li > .dropdown-item')
    }

    getJPWithdrawalActionStatusDropdown() {
        return cy.get('.my-2.mb-4 > :nth-child(2) > .form-control')
    }


    getJPWithdrawalActionsSave() {
        return cy.get('#show-summary___BV_modal_footer_ > div > .btn-info')
    }

    getJPWIthdrawalActionsCallbackResponse() {
        return cy.get('#show-summary___BV_modal_body_ > :nth-child(1) > :nth-child(6) > :nth-child(1) > .form-control')
    }

    getJPWithdrawalModalBody() {
        return cy.get('#show-summary___BV_modal_body_ > :nth-child(1)')
    }

    getJPWithdrawalModalBodyDebitAmount() {
        return cy.get(':nth-child(1) > .table > :nth-child(3) > :nth-child(2)')
    }


    getJPWithdrawalModalBodyBeneficiaryAmount() {
        return cy.get(':nth-child(1) > .table > :nth-child(5) > :nth-child(2)')
    }

    getJPWithdrawalModalBodyCallbackUrl() {
        return cy.get('.my-2.mb-4 > :nth-child(1)')
    }

    getTransactionListTable() {
        return cy.get('.card-default')
    }

    getTransactionListTableMerchantNumber() {
        return cy.get('tbody > tr > :nth-child(4)')
    }

    getTransactionListTableMerchantName() {
        return cy.get('tbody > tr > :nth-child(5)')
    }

    getTransactionListTableTxnNumber() {
        return cy.get('tbody > tr > :nth-child(6)')
    }

    getTransactionListTableMerchantTxnNumber() {
        return cy.get('tbody > tr > :nth-child(7)')
    }

    getTransactionListTableBankName() {
        return cy.get('tbody > tr > :nth-child(8)')
    }

    getTransactionListTableBankCode() {
        return cy.get('tbody > tr > :nth-child(9)')
    }

    getTransactionListTableBranchName() {
        return cy.get('tbody > tr > :nth-child(10)')
    }

    getTransactionListTableBranchCode() {
        return cy.get('tbody > tr > :nth-child(11)')
    }

    getTransactionListTableAccountType() {
        return cy.get('tbody > tr > :nth-child(12)')
    }

    getTransactionListTableAccountNumber() {
        return cy.get('tbody > tr > :nth-child(13)')
    }

    getTransactionListTableAccountHolderKatakana() {
        return cy.get('tbody > tr > :nth-child(14)')
    }

    getTransactionListTableAccountHolderKanji() {
        return cy.get('tbody > tr > :nth-child(15)')
    }

    getTransactionListTableAmount() {
        return cy.get('tbody > tr > :nth-child(17)')
    }

    getTransactionListTableFee() {
        return cy.get('tbody > tr > :nth-child(18)')
    }

    getTransactionListTableStatus() {
        return cy.get('tbody > tr > :nth-child(19)')
    }

    getTransactionListTableCallbackStatus() {
        return cy.get('tbody > tr > :nth-child(20)')
    }

    getTransactionListTableAPIType() {
        return cy.get('tbody > tr > :nth-child(21)')
    }

}
module.exports = JPWithdrawalTest