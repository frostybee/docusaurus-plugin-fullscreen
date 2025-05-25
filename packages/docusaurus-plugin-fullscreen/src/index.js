/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {Object} options - Plugin options
 * @returns {import('@docusaurus/types').Plugin}
 */
const path = require('path');

module.exports = function (context, options = {}) {
  return {
    name: 'docusaurus-plugin-fullscreen',
    
    getClientModules() {
      return [
        path.resolve(__dirname, './fullscreen-plugin.js'),
        path.resolve(__dirname, './fullscreen.module.css'),
      ];
    },    
    getStylesheets() {
      const cssPath = path.resolve(__dirname, "./fullscreen.module.css");
      console.log('🎨 CSS path:', cssPath); // Debug log
      return [cssPath];
    },
    
  };
};
