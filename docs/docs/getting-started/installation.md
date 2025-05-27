---
title: Installation
description: Learn how to install and set up the docusaurus-plugin-fullscreen in your Docusaurus site.
sidebar_position: 1
---

## Installation

Add fullscreen functionality to code blocks in your Docusaurus documentation website. This plugin enhances your code blocks by adding a fullscreen toggle button that allows users to view code in an immersive fullscreen mode.

## Prerequisites

You will need to have a Docusaurus website set up. If you don't have one yet, you can follow the [Docusaurus Installation Guide](https://docusaurus.io/docs/installation) to create one.

**Requirements:**
- Node.js 18.0 or higher
- Docusaurus 3.4 or higher
- React 18.0 or higher

## Installation Steps

### 1. Install the Plugin

Install `docusaurus-plugin-fullscreen` using your preferred package manager:

```bash npm2yarn
npm install docusaurus-plugin-fullscreen
```

### 2. Configure the Plugin

Add the plugin to your Docusaurus configuration in the `docusaurus.config.js` file:

```js title="docusaurus.config.js"
module.exports = {
  title: 'My Site',
  tagline: 'My site tagline',
  // ... other config options
  
  plugins: [
    'docusaurus-plugin-fullscreen',
    // ... other plugins
  ],
  
  // ... rest of your config
};
```

### 3. Start the Development Server

Start your Docusaurus development server to see the fullscreen functionality in action:

```bash npm2yarn
npm start
```

### 4. Verify Installation

Once your development server is running, navigate to any page with code blocks. You should see a fullscreen toggle button (⛶) in the top-right corner of each code block.

## Plugin Configuration

The plugin can be configured with various options. Here's an example with custom configuration:

```js title="docusaurus.config.js"
module.exports = {
  // ... other config
  
  plugins: [
    [
      'docusaurus-plugin-fullscreen',
      {
        fullscreenButtonTooltip: 'View in fullscreen',
        enableEscapeKey: true,
        exitOnBrowserBack: true,
        addToUntitledBlocks: true,
        fullscreenZoomLevel: 150,
        animationDuration: 200,
      },
    ],
    // ... other plugins
  ],
  
  // ... rest of your config
};
```

## Features After Installation

Once installed, the plugin will automatically add fullscreen functionality to your code blocks:

### Automatic Enhancement

- **Fullscreen buttons**: Added to all code blocks automatically
- **Theme integration**: Inherits your site's theme colors and styling
- **Responsive design**: Works on all screen sizes and devices

### User Experience

- **Click to expand**: Users can click the fullscreen button to expand code blocks
- **Keyboard navigation**: Tab through code blocks and press Enter to activate fullscreen
- **Multiple exit options**: Escape key, browser back button, or click the exit button
- **Smooth animations**: Elegant transitions when entering/exiting fullscreen mode

### Accessibility Features

- **ARIA labels**: Proper accessibility labels for screen readers
- **Focus management**: Maintains focus context and provides proper focus restoration
- **Keyboard support**: Full keyboard navigation support
- **High contrast**: Respects user's high contrast preferences

## Troubleshooting

### Plugin Not Working

If the fullscreen buttons don't appear:

1. **Check installation**: Ensure the plugin is properly installed in your `package.json`
2. **Verify configuration**: Make sure the plugin is added to the `plugins` array in `docusaurus.config.js`
3. **Restart server**: Stop and restart your development server
4. **Clear cache**: Clear your browser cache and Docusaurus build cache

### Build Issues

If you encounter build errors:

1. **Check Node.js version**: Ensure you're using Node.js 18.0 or higher
2. **Update dependencies**: Make sure all dependencies are up to date
3. **Check for conflicts**: Ensure no other plugins conflict with this one

## Next Steps

- [Configuration Guide](./configuration.md) - Learn about all available configuration options
- [Features Overview](../plugin-features/features.md) - Explore all the features and capabilities
- [Examples](../plugin-features/examples.md) - See the plugin in action with various code examples 