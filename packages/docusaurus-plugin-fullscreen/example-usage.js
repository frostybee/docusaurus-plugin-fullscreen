// Example of how to use the docusaurus-plugin-fullscreen with options
// This would go in your docusaurus.config.js file

module.exports = {
  // ... other Docusaurus config
  plugins: [
    [
      'docusaurus-plugin-fullscreen',
      {
        // Custom tooltip text for the fullscreen button
        fullscreenButtonTooltip: "Enter fullscreen mode",
        
        // Whether to enable ESC key to exit fullscreen
        enableEscapeKey: true,
        
        // Whether to exit fullscreen when browser back button is pressed
        exitOnBrowserBack: true,
        
        // Whether to add fullscreen buttons to code blocks without titles
        addToUntitledBlocks: true,
        
        // Zoom level when in fullscreen mode (percentage)
        fullscreenZoomLevel: 120,
        
        // Animation duration in milliseconds
        animationDuration: 200,
        
        // Custom SVG paths for fullscreen icons (optional)
        svgPathFullscreenOn: "M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",
        svgPathFullscreenOff: "M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z",
        
        // Custom CSS class for the fullscreen container
        fullscreenContainerClass: "my-custom-fullscreen-container"
      }
    ]
  ],
  // ... rest of config
};
