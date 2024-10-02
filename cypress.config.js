const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        findAndRenameLatestFile({ directoryPath, newFileName }) {
          // Read the directory
          const files = fs.readdirSync(directoryPath).map(file => ({
            name: file,
            time: fs.statSync(path.join(directoryPath, file)).mtime.getTime()
          }));

          // Find the latest file
          const latestFile = files.reduce((prev, current) => (prev.time > current.time) ? prev : current);

          // Rename the latest file
          const oldPath = path.join(directoryPath, latestFile.name);
          const newPath = path.join(directoryPath, newFileName);
          fs.renameSync(oldPath, newPath);

          return `Renamed ${latestFile.name} to ${newFileName}`;
        },

        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return `Deleted file: ${filePath}`;
          } else {
            return `File not found: ${filePath}`;
          }
        }
      });

      return config; // Important to return the config object
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
  viewportWidth: 2400,
  viewportHeight: 1500,
  defaultCommandTimeout: 10000
});
