/**
 * Docusaurus Code Block Fullscreen Plugin
 * Automatically adds fullscreen functionality to Docusaurus code blocks
 * 
 */

export default (function() {
  'use strict';
  
  // Check if we're in a Docusaurus environment
  if (!document.querySelector('[data-theme]') && !document.querySelector('.docusaurus')) {
    console.warn('Docusaurus fullscreen script: Not detected in Docusaurus environment');
    return;
  }
  
  // Avoid duplicate initialization
  if (window.docusaurusCodeFullscreenInitialized) return;
  window.docusaurusCodeFullscreenInitialized = true;

  // Configuration options
  const config = {
    fullscreenButtonTooltip: 'Toggle fullscreen view',
    fullscreenContainerClass: 'docusaurus-code-fullscreen-container',
    fullscreenActiveClass: 'docusaurus-code-fullscreen-active',
    enableEscapeKey: true,
    enableBackButton: true,
    // Docusaurus-specific selectors
    codeBlockSelector: '.theme-code-block, .prism-code, pre[class*="language-"]',
    codeBlockHeaderSelector: '.theme-code-block-title, .code-block-title, .prism-code-title',
    codeBlockContainerSelector: '.theme-code-block, [class*="codeBlockContainer"]',
  };

  // Override with custom config if provided
  Object.assign(config, window.DocusaurusCodeFullscreenConfig || {});

  // Initialize fullscreen state
  const fullscreenState = {
    isFullscreenActive: false,
    scrollPosition: 0,
    originalCodeBlock: null,
    currentTheme: null,
  };

  // Get current Docusaurus theme
  function getCurrentTheme() {
    const htmlElement = document.documentElement;
    return htmlElement.getAttribute('data-theme') || 'light';
  }

  // CSS styles for fullscreen functionality with Docusaurus theme integration
  const styles = `
    .${config.fullscreenContainerClass} {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;
      transition: opacity 0.2s ease;
    }

    .${config.fullscreenContainerClass}.is-open {
      display: block;
      opacity: 1;
    }

    .${config.fullscreenContainerClass}:not(.is-open) {
      opacity: 0;
    }

    /* Theme-aware background colors */
    [data-theme='light'] .${config.fullscreenContainerClass} {
      background-color: var(--ifm-background-color, #ffffff);
      color: var(--ifm-font-color-base, #1c1e21);
    }

    [data-theme='dark'] .${config.fullscreenContainerClass} {
      background-color: var(--ifm-background-color, #1b1b1d);
      color: var(--ifm-font-color-base, #ffffff);
    }

    .${config.fullscreenActiveClass} {
      width: 100% !important;
      max-width: none !important;
      height: auto !important;
      margin: 0 !important;
      border-radius: var(--ifm-code-border-radius, 4px) !important;
    }

    .docusaurus-fullscreen-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 4px;
      background: transparent;
      border: none;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s, background-color 0.2s;
      border-radius: var(--ifm-button-border-radius, 4px);
      color: var(--ifm-font-color-base);
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }

    .docusaurus-fullscreen-button:hover {
      opacity: 1;
      background-color: var(--ifm-color-emphasis-200);
    }

    .docusaurus-fullscreen-button:focus {
      outline: 2px solid var(--ifm-color-primary);
      outline-offset: 2px;
    }

    .docusaurus-fullscreen-button .fullscreen-on {
      display: inline;
    }

    .docusaurus-fullscreen-button .fullscreen-off {
      display: none;
    }

    .${config.fullscreenActiveClass} .docusaurus-fullscreen-button .fullscreen-on {
      display: none;
    }

    .${config.fullscreenActiveClass} .docusaurus-fullscreen-button .fullscreen-off {
      display: inline;
    }

    /* Ensure code block title has relative positioning for button placement */
    .theme-code-block-title,
    .code-block-title,
    .prism-code-title {
      position: relative;
    }

    /* Style for when there's no title - create a minimal header */
    .docusaurus-fullscreen-header {
      position: relative;
      padding: 8px 12px 8px 16px;
      background: var(--ifm-color-emphasis-100);
      border-bottom: 1px solid var(--ifm-color-emphasis-200);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      min-height: 20px;
      font-family: var(--ifm-font-family-monospace);
      font-size: 0.75rem;
      border-radius: var(--ifm-code-border-radius, 4px) var(--ifm-code-border-radius, 4px) 0 0;
    }

    [data-theme='dark'] .docusaurus-fullscreen-header {
      background: var(--ifm-color-emphasis-100);
      border-bottom-color: var(--ifm-color-emphasis-200);
    }

    /* Adjust for Docusaurus code block structure */
    .theme-code-block {
      position: relative;
    }

    /* Handle copy button positioning when fullscreen button is present */
    .theme-code-block .theme-code-block-title ~ div .clean-btn {
      right: 40px !important;
    }

    .docusaurus-fullscreen-header + div .clean-btn {
      right: 40px !important;
    }
  `;

  // Create and inject styles
  function injectStyles() {
    if (document.getElementById('docusaurus-code-fullscreen-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'docusaurus-code-fullscreen-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  // Create fullscreen container
  function createFullscreenContainer() {
    if (document.querySelector(`.${config.fullscreenContainerClass}`)) return;
    
    const container = document.createElement('div');
    container.className = config.fullscreenContainerClass;
    container.setAttribute('data-theme', getCurrentTheme());
    document.body.appendChild(container);
  }

  // Create fullscreen button HTML
  function createFullscreenButton() {
    const button = document.createElement('button');
    button.className = 'docusaurus-fullscreen-button';
    button.type = 'button';
    button.setAttribute('aria-label', config.fullscreenButtonTooltip);
    button.title = config.fullscreenButtonTooltip;
    
    button.innerHTML = `
      <svg class="fullscreen-on" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"/>
      </svg>
      <svg class="fullscreen-off" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"/>
      </svg>
    `;
    
    return button;
  }

  // Find the appropriate code block container
  function findCodeBlockContainer(element) {
    return element.closest('.theme-code-block') || 
           element.closest('[class*="codeBlockContainer"]') ||
           element.closest('.prism-code')?.parentElement ||
           element.closest('pre')?.parentElement;
  }

  // Add fullscreen button to a code block
  function addFullscreenButtonToBlock(codeBlock) {
    const container = findCodeBlockContainer(codeBlock);
    if (!container || container.querySelector('.docusaurus-fullscreen-button')) return;
    
    // Find existing title/header
    let header = container.querySelector(config.codeBlockHeaderSelector);
    
    if (!header) {
      // Check if there's a title attribute or data-title
      const pre = container.querySelector('pre');
      const title = pre?.getAttribute('title') || 
                   pre?.getAttribute('data-title') || 
                   container.getAttribute('data-title');
      
      if (title) {
        // Create a title header
        header = document.createElement('div');
        header.className = 'theme-code-block-title';
        header.textContent = title;
        header.style.position = 'relative';
        container.insertBefore(header, container.firstChild);
      } else {
        // Create minimal header for button placement
        header = document.createElement('div');
        header.className = 'docusaurus-fullscreen-header';
        container.insertBefore(header, container.firstChild);
      }
    }
    
    // Ensure header has relative positioning
    if (getComputedStyle(header).position === 'static') {
      header.style.position = 'relative';
    }
    
    // Add button to header
    const button = createFullscreenButton();
    header.appendChild(button);
  }

  // Initialize fullscreen buttons for all Docusaurus code blocks
  function initializeFullscreenButtons() {
    const codeBlocks = document.querySelectorAll(config.codeBlockSelector);
    
    codeBlocks.forEach(block => {
      addFullscreenButtonToBlock(block);
    });
    
    // Add event listeners to all fullscreen buttons
    document.querySelectorAll('.docusaurus-fullscreen-button').forEach(button => {
      // Remove existing listeners to avoid duplicates
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener('click', handleFullscreenClick);
    });
  }

  function handleFullscreenClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const codeBlockContainer = findCodeBlockContainer(this);
    if (codeBlockContainer) {
      toggleFullscreen(codeBlockContainer);
    }
  }

  function toggleFullscreen(codeBlock) {
    const fullscreenContainer = document.querySelector(`.${config.fullscreenContainerClass}`);

    if (fullscreenState.isFullscreenActive) {
      exitFullscreen(fullscreenContainer);
    } else {
      enterFullscreen(codeBlock, fullscreenContainer);
    }
  }

  function enterFullscreen(codeBlock, fullscreenContainer) {
    // Store reference and current theme
    fullscreenState.originalCodeBlock = codeBlock;
    fullscreenState.currentTheme = getCurrentTheme();
    
    // Clone the code block
    const clonedBlock = codeBlock.cloneNode(true);
    clonedBlock.classList.add(config.fullscreenActiveClass);

    // Update fullscreen container theme
    fullscreenContainer.setAttribute('data-theme', fullscreenState.currentTheme);

    // Add event listener to exit button in fullscreen mode
    const fullscreenButtonInClone = clonedBlock.querySelector('.docusaurus-fullscreen-button');
    if (fullscreenButtonInClone) {
      fullscreenButtonInClone.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleFullscreen(clonedBlock);
      });
    }

    // Save current state and enter fullscreen
    saveScrollPosition();
    setBodyOverflow(true);
    
    if (config.enableEscapeKey) addKeyupListener();
    if (config.enableBackButton) addPopStateListener();
    
    fullscreenContainer.appendChild(clonedBlock);
    fullscreenContainer.classList.add('is-open');
    fullscreenState.isFullscreenActive = true;
    
    // Focus the fullscreen container for better accessibility
    fullscreenContainer.focus();
  }

  function exitFullscreen(fullscreenContainer) {
    // Restore original state
    setBodyOverflow(false);
    restoreScrollPosition();
    
    if (config.enableEscapeKey) removeKeyupListener();
    if (config.enableBackButton) removePopStateListener();
    
    fullscreenContainer.classList.remove('is-open');
    
    // Clear container contents
    while (fullscreenContainer.firstChild) {
      fullscreenContainer.removeChild(fullscreenContainer.firstChild);
    }
    
    fullscreenState.isFullscreenActive = false;
    fullscreenState.originalCodeBlock = null;
    fullscreenState.currentTheme = null;
    
    // Return focus to original button
    const originalButton = document.querySelector('.docusaurus-fullscreen-button');
    if (originalButton) {
      originalButton.focus();
    }
  }

  function saveScrollPosition() {
    fullscreenState.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  }

  function restoreScrollPosition() {
    window.scrollTo(0, fullscreenState.scrollPosition);
  }

  function setBodyOverflow(hidden) {
    if (hidden) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  function handleKeyup(event) {
    if (event.key === 'Escape' && fullscreenState.isFullscreenActive) {
      const fullscreenContainer = document.querySelector(`.${config.fullscreenContainerClass}`);
      if (fullscreenContainer) {
        exitFullscreen(fullscreenContainer);
      }
    }
  }

  function addKeyupListener() {
    document.addEventListener('keyup', handleKeyup);
  }

  function removeKeyupListener() {
    document.removeEventListener('keyup', handleKeyup);
  }

  function handlePopState() {
    if (fullscreenState.isFullscreenActive) {
      const fullscreenContainer = document.querySelector(`.${config.fullscreenContainerClass}`);
      if (fullscreenContainer) {
        exitFullscreen(fullscreenContainer);
      }
    }
  }

  function addPopStateListener() {
    window.addEventListener('popstate', handlePopState);
  }

  function removePopStateListener() {
    window.removeEventListener('popstate', handlePopState);
  }

  // Handle theme changes
  function handleThemeChange() {
    const fullscreenContainer = document.querySelector(`.${config.fullscreenContainerClass}`);
    if (fullscreenContainer) {
      fullscreenContainer.setAttribute('data-theme', getCurrentTheme());
    }
  }

  // Main initialization function
  function initialize() {
    injectStyles();
    createFullscreenContainer();
    initializeFullscreenButtons();
    
    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          handleThemeChange();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Initialize when DOM is ready
  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  // Initialize the plugin
  domReady(initialize);

  // Re-initialize when new content is added (for client-side navigation)
  const contentObserver = new MutationObserver(function(mutations) {
    let shouldReinit = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.matches && (
                node.matches(config.codeBlockSelector) ||
                node.querySelector(config.codeBlockSelector)
              )) {
              shouldReinit = true;
              break;
            }
          }
        }
      }
    });
    
    if (shouldReinit) {
      setTimeout(initializeFullscreenButtons, 100);
    }
  });

  // Start observing
  domReady(function() {
    contentObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

  // Expose public API
  window.DocusaurusCodeFullscreen = {
    initialize: initialize,
    config: config,
    state: fullscreenState
  };

})();