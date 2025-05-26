/**
 * Docusaurus Fullscreen Plugin - Client Side
 * This module adds fullscreen functionality to code blocks
 */
class DocusaurusCodeFullscreen {
  constructor(options = {}) {
    
    // Default configuration
    this.defaultConfig = {
      fullscreenButtonTooltip: "Toggle fullscreen view",
      fullscreenContainerClass: "docusaurus-code-fullscreen-container",
      enableEscapeKey: true,
      exitOnBrowserBack: true,
      addToFramelessBlocks: true,
      fullscreenZoomLevel: 150,
      animationDuration: 150,
      svgPathFullscreenOn:
        "M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",
      svgPathFullscreenOff:
        "M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z",
    };

    // Merge options with defaults
    this.config = Object.assign({}, this.defaultConfig, options);

    // Initialize fullscreen state
    this.fullscreenState = {
      isFullscreenActive: false,
      scrollPosition: 0,
      originalCodeBlock: null,
      currentTheme: null,
      currentZoom: 100,
      focusTrapHandler: null,
    };

    // Initialize zoom manager
    this.zoomManager = {
      storageKey: "docusaurusCodeFullscreenZoom",

      getCurrentZoom: () => {
        return Math.round(window.devicePixelRatio * 100);
      },

      getZoomData: () => {
        try {
          const data = localStorage.getItem(this.zoomManager.storageKey);
          return data ? JSON.parse(data) : {};
        } catch (e) {
          return {};
        }
      },

      storeInitialZoom: (zoom) => {
        const data = this.zoomManager.getZoomData();
        data.initialZoom = zoom;
        try {
          localStorage.setItem(this.zoomManager.storageKey, JSON.stringify(data));
        } catch (e) {
          console.warn("Could not store zoom level in localStorage.");
        }
      },

      getStoredInitialZoom: () => {
        const data = this.zoomManager.getZoomData();
        return data.initialZoom || null;
      },

      setZoom: (level) => {
        document.body.style.zoom = `${level}%`;
      },

      removeZoomStyling: () => {
        document.body.style.zoom = "";
      },

      init: () => {
        const currentZoom = this.zoomManager.getCurrentZoom();
        const storedInitial = this.zoomManager.getStoredInitialZoom();

        if (!storedInitial) {
          this.zoomManager.storeInitialZoom(currentZoom);
        }
      },
    };

    // Bind methods to preserve 'this' context
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.handleFullscreenClick = this.handleFullscreenClick.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  /**
   * Get current Docusaurus theme
   */
  getCurrentTheme() {
    const htmlElement = document.documentElement;
    const theme = htmlElement.getAttribute("data-theme");
    
    // If no theme attribute, try to detect from body classes or other indicators
    if (!theme) {
      if (document.body.classList.contains('dark')) return 'dark';
      if (document.body.classList.contains('light')) return 'light';
      // Check for dark mode media query as fallback
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return theme || "light";
  }

  /**
   * Set zoom to configured level for fullscreen mode
   */
  setFullscreenZoom() {
    const currentZoom = this.zoomManager.getCurrentZoom();
    this.fullscreenState.currentZoom = currentZoom;
    this.zoomManager.setZoom(this.config.fullscreenZoomLevel);
  }

  /**
   * Restore zoom to the initial state
   */
  restoreInitialZoom() {
    const initialZoom = this.zoomManager.getStoredInitialZoom();

    if (initialZoom) {
      this.zoomManager.setZoom(initialZoom);
    } else {
      this.zoomManager.removeZoomStyling();
    }
  }

  /**
   * Create fullscreen container
   */
  createFullscreenContainer() {
    if (document.querySelector(`.${this.config.fullscreenContainerClass}`)) return;

    const container = document.createElement("div");
    container.className = this.config.fullscreenContainerClass;
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-modal", "true");
    container.setAttribute("aria-label", "Code block in fullscreen view");
    container.setAttribute("tabindex", "-1");
    container.setAttribute("data-theme", this.getCurrentTheme());
    document.body.appendChild(container);
  }

  /**
   * Create hint element for fullscreen mode
   */
  createFullscreenHint() {
    const hint = document.createElement("div");
    hint.className = "docusaurus-fullscreen-hint";
    hint.innerHTML = "Press <kbd>Esc</kbd> to exit full screen";
    return hint;
  }

  /**
   * Create fullscreen button HTML
   */
  createFullscreenButton() {
    const button = document.createElement("button");
    button.className = "docusaurus-fullscreen-button";
    button.type = "button";
    button.setAttribute("aria-label", this.config.fullscreenButtonTooltip);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("data-tooltip", this.config.fullscreenButtonTooltip);

    button.innerHTML = `
        <svg class="fullscreen-on" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="${this.config.svgPathFullscreenOn}"/>
        </svg>
        <svg class="fullscreen-off" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="${this.config.svgPathFullscreenOff}"/>
        </svg>
      `;

    return button;
  }

  /**
   * Find the appropriate code block container
   */
  findCodeBlockContainer(element) {
    return (
      element.closest(".theme-code-block") ||
      element.closest('[class*="codeBlockContainer"]') ||
      element.closest(".prism-code")?.parentElement ||
      element.closest("pre")?.parentElement
    );
  }

  /**
   * Add fullscreen button to a code block
   */
  addFullscreenButtonToBlock(codeBlock) {
    const container = this.findCodeBlockContainer(codeBlock);
    if (!container || container.querySelector(".docusaurus-fullscreen-button"))
      return;

    // First, check for codeBlockTitle class element (with hash suffix)
    let header = container.querySelector('[class*="codeBlockTitle_"]');

    // If no codeBlockTitle, fall back to other header selectors
    if (!header) {
      header = container.querySelector(
        '[class*="codeBlockTitle_"], .theme-code-block-title, .code-block-title, .prism-code-title'
      );
    }

    // Check if the code block has a title/header
    const hasHeaderArea = !!header;

    if (!header) {
      // Check if there's a title attribute or data-title
      const pre = container.querySelector("pre");
      const title =
        pre?.getAttribute("title") ||
        pre?.getAttribute("data-title") ||
        container.getAttribute("data-title");

      if (title) {
        // Create a title header
        header = document.createElement("div");
        header.className = "theme-code-block-title";
        header.textContent = title;
        header.style.position = "relative";
        container.insertBefore(header, container.firstChild);
      } else if (hasHeaderArea || this.config.addToFramelessBlocks) {
        // Create minimal header for button placement
        header = document.createElement("div");
        header.className = "docusaurus-fullscreen-header";
        container.insertBefore(header, container.firstChild);
      }
    }

    if (header) {
      // Ensure header has relative positioning
      if (getComputedStyle(header).position === "static") {
        header.style.position = "relative";
      }

      // Add button to header
      const button = this.createFullscreenButton();
      button.style.cssText = `
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        `;
      header.appendChild(button);
    } else {
      // For code blocks without titles, add button as floating button
      const copyButton = container.querySelector(".clean-btn, .copy");
      if (copyButton) {
        // Create a container for the fullscreen button
        const fullscreenContainer = document.createElement("div");
        fullscreenContainer.className = "docusaurus-fullscreen";
        fullscreenContainer.style.cssText = `
            position: absolute;
            top: 3.125rem;
            right: 0.5rem;
            z-index: 15;
            pointer-events: auto;
          `;

        const button = this.createFullscreenButton();
        button.classList.add("docusaurus-fullscreen-button-floating");
        button.style.cssText = `
            width: 2rem;
            height: 2rem;
            padding: 0.5rem;
            background-color: var(--ifm-color-emphasis-200);
            border-radius: 0.375rem;
            opacity: 0.7;
            transition: opacity 0.2s ease, background-color 0.2s ease;
            pointer-events: auto;
            cursor: pointer;
          `;

        fullscreenContainer.appendChild(button);
        copyButton.parentNode.appendChild(fullscreenContainer);
      }
    }
  }

  /**
   * Initialize fullscreen buttons for all Docusaurus code blocks
   */
  initializeFullscreenButtons() {
    // Try multiple selectors to find code blocks
    let codeBlocks = document.querySelectorAll('[class*="codeBlockContainer_"]');

    if (codeBlocks.length === 0) {
      codeBlocks = document.querySelectorAll(".theme-code-block");
    }

    if (codeBlocks.length === 0) {
      codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    }

    if (codeBlocks.length === 0) {
      codeBlocks = document.querySelectorAll("pre");
    }

    codeBlocks.forEach((block) => {
      this.addFullscreenButtonToBlock(block);
    });

    // Add event listeners to all fullscreen buttons
    document
      .querySelectorAll(".docusaurus-fullscreen-button")
      .forEach((button) => {
        // Remove existing listeners to avoid duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener("click", this.handleFullscreenClick);

        // Add keyboard support for Enter and Space keys
        newButton.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.handleFullscreenClick.call(newButton, event);
          }
        });
      });
  }

  /**
   * Handle fullscreen button click
   */
  handleFullscreenClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const codeBlockContainer = this.findCodeBlockContainer(event.target);
    if (codeBlockContainer) {
      this.toggleFullscreen(codeBlockContainer);
    }
  }

  /**
   * Get the current page background color
   */
  getPageBackgroundColor() {
    // Check body background first
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)' && bodyBg !== 'transparent') {
      return bodyBg;
    }

    // Fallback to html element
    const fallbackBg = window.getComputedStyle(document.documentElement).backgroundColor;
    if (fallbackBg && fallbackBg !== 'rgba(0, 0, 0, 0)' && fallbackBg !== 'transparent') {
      return fallbackBg;
    }
    return '#ffffff';
  }

  /**
   * Get appropriate text color based on background
   */
  getContrastTextColor(backgroundColor) {
    const rgb = backgroundColor.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const brightness =
        (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      return brightness > 128 ? '#000000' : '#ffffff';
    }
    return '#000000';
  }

  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen(codeBlock) {
    const fullscreenContainer = document.querySelector(
      `.${this.config.fullscreenContainerClass}`
    );

    if (this.fullscreenState.isFullscreenActive) {
      this.exitFullscreen(fullscreenContainer);
    } else {
      this.enterFullscreen(codeBlock, fullscreenContainer);
    }
  }

  /**
   * Enter fullscreen mode
   */
  enterFullscreen(codeBlock, fullscreenContainer) {
    // Store reference and current theme
    this.fullscreenState.originalCodeBlock = codeBlock;
    this.fullscreenState.currentTheme = this.getCurrentTheme();

    // Update aria-expanded state for accessibility
    const originalButton = codeBlock.querySelector(".docusaurus-fullscreen-button");
    if (originalButton) {
      originalButton.setAttribute("aria-expanded", "true");
    }

    // Clone the code block
    const clonedBlock = codeBlock.cloneNode(true);
    clonedBlock.classList.add("docusaurus-code-fullscreen-active");

    // Update fullscreen container theme
    fullscreenContainer.setAttribute("data-theme", this.fullscreenState.currentTheme);
    
    // Force theme update by copying theme from document element
    const documentTheme = document.documentElement.getAttribute("data-theme");
    if (documentTheme) {
      fullscreenContainer.setAttribute("data-theme", documentTheme);
    }
    
    // Apply page background color to fullscreen container
    const pageBackgroundColor = this.getPageBackgroundColor();
    const textColor = this.getContrastTextColor(pageBackgroundColor);
    fullscreenContainer.style.setProperty('background-color', pageBackgroundColor, 'important');
    fullscreenContainer.style.setProperty('color', textColor, 'important');

    // Add event listener to exit button in fullscreen mode
    const fullscreenButtonInClone = clonedBlock.querySelector(".docusaurus-fullscreen-button");
    if (fullscreenButtonInClone) {
      fullscreenButtonInClone.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.toggleFullscreen(clonedBlock);
      });

      // Add keyboard support for cloned button
      fullscreenButtonInClone.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.toggleFullscreen(clonedBlock);
        }
      });
    }

    // Save current state and enter fullscreen
    this.saveScrollPosition();
    this.setFullscreenZoom();
    this.setBodyOverflow(true);

    if (this.config.enableEscapeKey) this.addKeyupListener();
    if (this.config.exitOnBrowserBack) {
      history.pushState({ fullscreenActive: true }, "", window.location.href);
      this.addPopStateListener();
    }

    fullscreenContainer.appendChild(clonedBlock);

    // Add hint if escape key is enabled
    if (this.config.enableEscapeKey) {
      const hint = this.createFullscreenHint();
      fullscreenContainer.appendChild(hint);

      // Auto-hide hint after 4 seconds
      setTimeout(() => {
        if (hint && hint.parentNode) {
          hint.style.setProperty("transition", "opacity 0.9s ease", "important");
          hint.style.setProperty("opacity", "0", "important");

          setTimeout(() => {
            if (hint && hint.parentNode) {
              hint.remove();
            }
          }, 500);
        }
      }, 4000);
    }

    fullscreenContainer.classList.add("is-open");
    this.fullscreenState.isFullscreenActive = true;

    // Focus the fullscreen container for better accessibility
    fullscreenContainer.focus();

    // Add focus trap for modal behavior
    this.addFocusTrap(fullscreenContainer);
  }

  /**
   * Exit fullscreen mode
   */
  exitFullscreen(fullscreenContainer) {
    // Restore original state
    this.setBodyOverflow(false);
    this.restoreInitialZoom();
    this.restoreScrollPosition();

    if (this.config.enableEscapeKey) this.removeKeyupListener();
    if (this.config.exitOnBrowserBack) {
      this.removePopStateListener();
      if (history.state && history.state.fullscreenActive) {
        history.back();
      }
    }

    // Remove focus trap
    this.removeFocusTrap();

    fullscreenContainer.classList.remove("is-open");

    // Clear container contents
    while (fullscreenContainer.firstChild) {
      fullscreenContainer.removeChild(fullscreenContainer.firstChild);
    }

    this.fullscreenState.isFullscreenActive = false;

    // Return focus to original code block or button
    if (this.fullscreenState.originalCodeBlock) {
      const originalButton = this.fullscreenState.originalCodeBlock.querySelector(
        ".docusaurus-fullscreen-button"
      );
      if (originalButton) {
        originalButton.setAttribute("aria-expanded", "false");
        originalButton.blur();
      }
    }

    // Clear the reference after using it
    this.fullscreenState.originalCodeBlock = null;
    this.fullscreenState.currentTheme = null;
  }

  /**
   * Save the current scroll position
   */
  saveScrollPosition() {
    this.fullscreenState.scrollPosition =
      window.scrollY || document.documentElement.scrollTop;
  }

  /**
   * Restore the scroll position
   */
  restoreScrollPosition() {
    if (
      typeof this.fullscreenState.scrollPosition === "number" &&
      !isNaN(this.fullscreenState.scrollPosition)
    ) {
      setTimeout(() => {
        window.scrollTo({
          top: this.fullscreenState.scrollPosition,
          behavior: "smooth",
        });
      }, 0);
    }
  }

  /**
   * Set the body overflow
   */
  setBodyOverflow(hidden) {
    if (hidden) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }

  /**
   * Handle the keyup event when the escape key is pressed
   */
  handleKeyup(event) {
    if (event.key === "Escape" && this.fullscreenState.isFullscreenActive) {
      const fullscreenContainer = document.querySelector(
        `.${this.config.fullscreenContainerClass}`
      );
      if (fullscreenContainer) {
        this.exitFullscreen(fullscreenContainer);
      }
    }
  }

  /**
   * Add keyup listener
   */
  addKeyupListener() {
    document.removeEventListener("keyup", this.handleKeyup);
    document.addEventListener("keyup", this.handleKeyup);
  }

  /**
   * Remove keyup listener
   */
  removeKeyupListener() {
    document.removeEventListener("keyup", this.handleKeyup);
  }

  /**
   * Handle the popstate event when the back button is pressed
   */
  handlePopState(event) {
    if (this.fullscreenState.isFullscreenActive) {
      const isBackButtonPressed = !event.state || !event.state.fullscreenActive;
      if (isBackButtonPressed) {
        const fullscreenContainer = document.querySelector(
          `.${this.config.fullscreenContainerClass}`
        );
        if (fullscreenContainer) {
          this.removePopStateListener();
          this.exitFullscreen(fullscreenContainer);
        }
      }
    }
  }

  /**
   * Add popstate listener
   */
  addPopStateListener() {
    window.removeEventListener("popstate", this.handlePopState);
    window.addEventListener("popstate", this.handlePopState);
  }

  /**
   * Remove popstate listener
   */
  removePopStateListener() {
    window.removeEventListener("popstate", this.handlePopState);
  }

  /**
   * Add focus trap to keep focus within the fullscreen container
   */
  addFocusTrap(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    this.fullscreenState.focusTrapHandler = handleTabKey;
  }

  /**
   * Remove focus trap
   */
  removeFocusTrap() {
    const container = document.querySelector(
      `.${this.config.fullscreenContainerClass}`
    );
    if (container && this.fullscreenState.focusTrapHandler) {
      container.removeEventListener("keydown", this.fullscreenState.focusTrapHandler);
      this.fullscreenState.focusTrapHandler = null;
    }
  }

  /**
   * Handle theme changes
   */
  handleThemeChange() {
    const fullscreenContainer = document.querySelector(
      `.${this.config.fullscreenContainerClass}`
    );
    if (fullscreenContainer) {
      fullscreenContainer.setAttribute("data-theme", this.getCurrentTheme());
    }
  }

  /**
   * Handle navigation events
   */
  handleNavigation(source) {
    setTimeout(() => {
      this.initializeFullscreenButtons();
    }, 200);
  }

  /**
   * Main initialization function
   */
  initialize() {
    // Initialize zoom manager
    this.zoomManager.init();
    this.createFullscreenContainer();
    this.initializeFullscreenButtons();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          this.handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Handle Docusaurus client-side navigation
    window.addEventListener("popstate", () => this.handleNavigation("popstate"));

    // Listen for programmatic navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      this.handleNavigation("pushState");
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      this.handleNavigation("replaceState");
    };

    // Listen for hash changes
    window.addEventListener("hashchange", () => this.handleNavigation("hashchange"));
  }
}

// Initialize the plugin
(function () {
  "use strict";
  
  // Check if we're in a Docusaurus environment
  if (
    !document.querySelector("[data-theme]") &&
    !document.querySelector(".docusaurus")
  ) {
    console.warn(
      "Docusaurus fullscreen script: Not detected in Docusaurus environment"
    );
    return;
  }

  // Avoid duplicate initialization
  if (window.docusaurusCodeFullscreenInitialized) return;
  window.docusaurusCodeFullscreenInitialized = true;

  // Get options from global config with error handling
  let options = {};
  try {
    options = window.DocusaurusCodeFullscreenConfig || {};
    // Ensure it's a valid object
    if (typeof options !== 'object' || options === null) {
      console.warn('DocusaurusCodeFullscreenConfig is not a valid object, using defaults');
      options = {};
    }
  } catch (e) {
    console.warn('Error reading DocusaurusCodeFullscreenConfig, using defaults:', e.message);
    options = {};
  }

  // Create and initialize the fullscreen plugin
  const fullscreenPlugin = new DocusaurusCodeFullscreen(options);

  // Initialize after a short delay to ensure DOM is ready
  setTimeout(() => {
    fullscreenPlugin.initialize();
  }, 300);

  // Store instance globally for potential external access
  window.docusaurusCodeFullscreenInstance = fullscreenPlugin;
})();
