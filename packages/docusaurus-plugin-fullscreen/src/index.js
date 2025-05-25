/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {Object} options - Plugin options
 * @returns {import('@docusaurus/types').Plugin}
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (context, options = {}) {
  return {
    name: 'docusaurus-plugin-fullscreen',
    
    getClientModules() {      
      return [
        path.resolve(__dirname, './fullscreen-plugin.js'),
        path.resolve(__dirname, './styles/fullscreen.css')];
    },   
    
  };
}
