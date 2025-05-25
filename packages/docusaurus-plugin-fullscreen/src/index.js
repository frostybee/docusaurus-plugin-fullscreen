/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {Object} options - Plugin options
 * @returns {import('@docusaurus/types').Plugin}
 */
function pluginFullscreen(context, options = {}) {
  return {
    name: 'docusaurus-plugin-fullscreen',
    
    getClientModules() {
      return [];
    },
    
    configureWebpack() {
      return {};
    },
  };
}

module.exports = pluginFullscreen; 