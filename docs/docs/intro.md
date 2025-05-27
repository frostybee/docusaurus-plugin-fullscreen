---
title: Introduction
description: Welcome to the Docusaurus Code Block Fullscreen plugin documentation.
sidebar_position: 1
slug: /
---

## What is this plugin?

The Docusaurus Code Block Fullscreen plugin adds a fullscreen toggle button to code blocks in your documentation, allowing users to view code in an immersive, distraction-free fullscreen mode. This is particularly useful for:

- **Long code examples** that don't fit well in the normal page layout
- **Complex code snippets** that benefit from larger viewing area
- **Mobile users** who need better readability
- **Presentations** where code needs to be clearly visible to audiences

## Key Features

- **One-click fullscreen**: Simple button click to expand code blocks
- **Keyboard shortcuts**: Use `Esc` to exit fullscreen mode
- **Theme integration**: Automatically adapts to your site's light/dark theme
- **Responsive design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Configure button placement, zoom levels, and animations

## Quick Example

Here's a code block with fullscreen functionality (when the plugin is enabled):

```javascript title="example.js"
// Click the fullscreen button to see this code in fullscreen mode
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to the documentation`;
}

const user = "Developer";
greetUser(user);
```

## Getting Started

Ready to add fullscreen functionality to your Docusaurus site? Here's how to get started:

1. **[Installation](./getting-started/installation.md)** - Install and configure the plugin
2. **[Configuration](./getting-started/configuration.md)** - Customize the plugin to your needs
3. **[Features](./plugin-features/features.md)** - Explore all available features
4. **[Examples](./plugin-features/examples.md)** - See the plugin in action

## Installation Preview

```bash
# Install the plugin
npm install docusaurus-plugin-fullscreen

# Add to your docusaurus.config.js
module.exports = {
  plugins: ['docusaurus-plugin-fullscreen'],
};
```

That's it! Your code blocks now have fullscreen capabilities.

## Support

- **GitHub Repository**: [docusaurus-plugin-fullscreen](https://github.com/frostybee/docusaurus-plugin-fullscreen)
- **Issues**: Report bugs or request features on GitHub
- **Documentation**: This comprehensive guide covers all features and configuration options

---

**Ready to enhance your documentation?** Let's get started with the [installation guide](./getting-started/installation.md)! 