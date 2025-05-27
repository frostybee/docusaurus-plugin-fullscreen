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
        path.resolve(__dirname, './styles/codeblock-fullscreen.css')
      ];
    },
    
    injectHtmlTags() {
      // Safely serialize options, filtering out problematic values
      const safeOptions = {};
      
      for (const [key, value] of Object.entries(options)) {
        // Only include serializable values
        if (value !== undefined && typeof value !== 'function') {
          try {
            JSON.stringify(value);
            safeOptions[key] = value;
          } catch (e) {
            console.warn(`Skipping option "${key}" - not serializable:`, e.message);
          }
        }
      }
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              window.DocusaurusCodeFullscreenConfig = ${JSON.stringify(safeOptions)};
            `,
          },
        ],
      };
    },
  };
};
