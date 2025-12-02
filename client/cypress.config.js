const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // We will run our React app here
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false, // Disabling support file for simplicity in this assignment
  },
});