/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {Object} options - Plugin options
 * @returns {import('@docusaurus/types').Plugin}
 */
import path from 'path';
module.exports = function (context, options = {}) {
  return {
    name: 'docusaurus-plugin-fullscreen',
    getClientModules() {
      return [path.resolve(__dirname, './fullscreen-plugin.js')];
    },         
  };
}

