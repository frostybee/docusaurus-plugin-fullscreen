---
title: Configuration
description: Configure the docusaurus-plugin-fullscreen plugin with various options to customize the fullscreen functionality.
order: 2
---

# Configuration

The Docusaurus Code Block Fullscreen plugin provides several configuration options to customize the fullscreen functionality for your code blocks. You can easily adjust these settings to fit your website's needs and user experience preferences.

## Basic Configuration

The plugin can be configured in your `docusaurus.config.js` file. Add it to the `plugins` array with your desired options:

```js title="docusaurus.config.js"
module.exports = {
  // ... other config
  
  plugins: [
    [
      'docusaurus-plugin-fullscreen',
      {
        // Configuration options go here
      },
    ],
    // ... other plugins
  ],
  
  // ... rest of your config
};
```

## Configuration Options

The plugin accepts an object with the following options. All options are optional and have sensible defaults.

### `fullscreenButtonTooltip`

- **Type**: `string`
- **Default**: `"Toggle fullscreen view"`
- **Description**: Defines the text displayed in the tooltip when hovering over the fullscreen toggle button. Customize this to provide a user-friendly message in your preferred language.

```js title="docusaurus.config.js"
{
  fullscreenButtonTooltip: "View in fullscreen mode"
}
```

### `enableEscapeKey`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls whether the Escape key can be used to exit fullscreen mode. Set to `true` to allow users to press Escape to exit fullscreen, or `false` to disable this functionality.

```js title="docusaurus.config.js"
{
  enableEscapeKey: false // Disable Escape key to exit fullscreen
}
```

### `exitOnBrowserBack`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Determines whether the browser's back button can be used to exit fullscreen mode. When enabled, the plugin adds a history entry when entering fullscreen, allowing users to use the back button to exit.

```js title="docusaurus.config.js"
{
  exitOnBrowserBack: false // Disable back button to exit fullscreen
}
```

### `addToFramelessBlocks`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls whether the fullscreen button should be added to frameless code blocks (blocks without titles). Set to `true` to add buttons to all code blocks including frameless ones, or `false` to add buttons only to titled code blocks.

```js title="docusaurus.config.js"
{
  addToFramelessBlocks: false // Only add buttons to titled code blocks
}
```

### `fullscreenZoomLevel`

- **Type**: `number`
- **Default**: `150`
- **Description**: Specifies the zoom level (as a percentage) applied when entering fullscreen mode. This helps optimize code readability in fullscreen view. For example, `150` means 150% zoom level.

```js title="docusaurus.config.js"
{
  fullscreenZoomLevel: 120 // Set zoom to 120% in fullscreen mode
}
```

### `animationDuration`

- **Type**: `number`
- **Default**: `150`
- **Range**: `150` to `700` milliseconds
- **Description**: The duration of the fullscreen animation in milliseconds. Controls how fast the transition to and from fullscreen mode occurs. Values outside the range will be automatically adjusted.

```js title="docusaurus.config.js"
{
  animationDuration: 300 // Slower animation (300ms)
}
```

### `svgPathFullscreenOn`

- **Type**: `string`
- **Default**: `"M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"`
- **Description**: The SVG path for the fullscreen button when not in fullscreen mode (enter fullscreen icon). Customize this to use your own icon design.

```js title="docusaurus.config.js"
{
  svgPathFullscreenOn: "M5 5h4v2H7v2H5V5zm10 0v4h-2V7h-2V5h4zm-10 10v-4h2v2h2v2H5zm10 0h-4v-2h2v-2h2v4z"
}
```

### `svgPathFullscreenOff`

- **Type**: `string`
- **Default**: `"M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"`
- **Description**: The SVG path for the fullscreen button when in fullscreen mode (exit fullscreen icon). Customize this to use your own icon design.

```js title="docusaurus.config.js"
{
  svgPathFullscreenOff: "M14 14h4v2h-6V10h2v4zM4 14v-4h2v6H0v-2h4zm10-10V0h2v6h-6V4h4zM4 4h6V2H4v6H2V4z"
}
```

### `fullscreenContainerClass`

- **Type**: `string`
- **Default**: `"docusaurus-code-fullscreen-container"`
- **Description**: The CSS class name for the fullscreen container. You can customize this if you need to avoid conflicts with existing styles.

```js title="docusaurus.config.js"
{
  fullscreenContainerClass: "my-custom-fullscreen-container"
}
```

## Complete Example Configuration

Here's a comprehensive example showing all available options configured:

```js title="docusaurus.config.js"
module.exports = {
  title: 'My Documentation',
  tagline: 'Awesome docs with fullscreen code blocks',
  
  plugins: [
    [
      'docusaurus-plugin-fullscreen',
      {
        // Tooltip text for the fullscreen button
        fullscreenButtonTooltip: 'Expand to fullscreen',
        
        // Enable/disable escape key to exit fullscreen
        enableEscapeKey: true,
        
        // Enable/disable browser back button to exit fullscreen
        exitOnBrowserBack: true,
        
        // Add fullscreen buttons to all code blocks (including frameless)
        addToFramelessBlocks: true,
        
        // Zoom level when in fullscreen mode (120% zoom)
        fullscreenZoomLevel: 120,
        
        // Animation duration for transitions (300ms)
        animationDuration: 300,
        
        // Custom SVG path for enter fullscreen icon
        svgPathFullscreenOn: "M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",
        
        // Custom SVG path for exit fullscreen icon
        svgPathFullscreenOff: "M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z",
        
        // Custom CSS class for fullscreen container
        fullscreenContainerClass: "my-fullscreen-container",
      },
    ],
    // ... other plugins
  ],
  
  // ... rest of your config
};
```

## Configuration Tips

### Performance Optimization

- **Animation Duration**: Use shorter durations (150-200ms) for snappier interactions, longer durations (300-500ms) for smoother animations
- **Zoom Level**: Higher zoom levels (150-200%) improve readability but may affect performance on lower-end devices

### User Experience

- **Tooltip Text**: Customize the tooltip text to match your site's language and tone
- **Keyboard Navigation**: Keep `enableEscapeKey` enabled for better accessibility
- **Browser Integration**: Keep `exitOnBrowserBack` enabled for intuitive navigation

### Accessibility

- **Focus Management**: The plugin automatically handles focus management for accessibility
- **ARIA Labels**: Proper ARIA labels are automatically added to fullscreen buttons
- **Keyboard Support**: Full keyboard navigation is supported by default

### Styling Integration

- **Theme Compatibility**: The plugin automatically adapts to your Docusaurus theme
- **Custom Icons**: Use custom SVG paths to match your site's design language
- **CSS Classes**: Customize CSS class names to avoid conflicts with existing styles

## Troubleshooting Configuration

### Invalid Configuration Values

The plugin validates configuration values and provides fallbacks:

- **Animation Duration**: Values outside 150-700ms range are automatically corrected to 200ms
- **Zoom Level**: Invalid zoom levels default to 150%
- **SVG Paths**: Invalid SVG paths fall back to default icons

### Configuration Not Applied

If your configuration changes aren't taking effect:

1. **Restart Development Server**: Stop and restart your development server
2. **Clear Cache**: Clear your browser cache and Docusaurus build cache
3. **Check Syntax**: Ensure your `docusaurus.config.js` syntax is correct
4. **Verify Plugin Array**: Make sure the plugin is properly configured in the plugins array
