import Papa from 'papaparse';

function parsePapa() {
    return Cypress.Commands.add("parseCsv", (csvFilePath) => {
        return cy.readFile(csvFilePath).then((csvData) => {
            return new Cypress.Promise((resolve, reject) => {
                Papa.parse(csvData, {
                    header: true, // Ensures the first row is used as keys
                    complete: (result) => resolve(result.data),
                    error: (error) => reject(error),
                });
            });
        });
    });
}

export default parsePapa;