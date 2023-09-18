const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "./node_modules/@kanidjar/cypress-qatouch-reporter",
  reporterOptions: {
    "domain": "rhgc", 
    "apiToken": "ce3f34014ec66f88e33de2079af283c35108eb7bc5fa4e59d13aa68608f581df", 
    "projectKey": "REMe",
    "testRunKey": "j2W9" 
  },
  viewportWidth: 1800,
  viewportHeight: 1000,
});
