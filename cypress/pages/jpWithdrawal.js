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
        return cy.get('[data-v-36195da4] > .btn.dropdown-toggle.btn-secondary.btn-sm')
    }

    getJPWIthdrawalActionAddEdit() {
        return cy.get('[data-v-36195da4] > .dropdown-menu > li > .dropdown-item')
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

    getJPWithdrawaModalBackButton() {
        return cy.get('#show-summary___BV_modal_footer_ > div > .btn-secondary')
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

    getJPWithdrawalReload() {
        return cy.get('.px-4 > a > .material-design-icon > .material-design-icon__svg')
    }

    getJPWithdrawalStatusFilter() {
        return cy.get('.card-body > :nth-child(2) > :nth-child(1) > .form-control')
    }

    getJPWithdrawalExportButton() {
        return cy.get('.btn-warning')
    }

    getJPWithdrawalExportConfirmation() {
        return cy.get('.float-right > div > .btn-success')
    }

    getJPWithdrawalTotalTransactions() {
        return cy.get('tbody > tr > .py-2')
    }

    getJPWithdrawalTotalAmount() {
        return cy.get('.row > table > tbody > tr > :nth-child(2)')
    }

    getJPWithdrawalTotalFee() {
        return cy.get('.row > table > tbody > tr > :nth-child(3)')
    }

    getJPWithdrawalAPITypeFilter() {
        return cy.get(':nth-child(3) > .form-control')
    }

    getJPWithdrawalDateFromFilter() {
        return cy.get(':nth-child(6) > :nth-child(1) > .form-control')
    }

    getJPWithdrawalDateToFilter() {
        return cy.get(':nth-child(6) > :nth-child(2) > .form-control')
    }

    getJPWithdrawalCheckAll() {
        return cy.get('thead > tr > :nth-child(1) > input')
    }

    getJPWithdrawalUpdateRow() {
        return cy.get('.row.ml-2 > .d-flex')
    }

    getJPWithdrawalCompletionYesBtn() {
        return cy.get(':nth-child(1) > div > .btn-success')
    }

    getJPWithdrawalSuccessMessage() {
        return cy.get('.toast')
    }

    getJPWithdrawalLastPage() {
        return cy.get(':nth-child(8) > .page-link')
    }

    getJPWithdrawalGotoPage() {
        return cy.get('.flex-goto > :nth-child(2) > .form-control')
    }

    getJPWithdrawalGoBtn() {
        return cy.get('.flex-goto > :nth-child(3) > .btn')
    }

}
module.exports = JPWithdrawalTest