---
title: Features
description: Explore the comprehensive features of the docusaurus-plugin-fullscreen plugin.
sidebar_position: 1
---

## Features

The Docusaurus Code Block Fullscreen plugin enhances your documentation experience by providing fullscreen functionality for code blocks. Here's a comprehensive overview of all the features available.

## Fullscreen Mode

Transform any code block into a distraction-free fullscreen view with a single click. The fullscreen mode provides:

- **Enhanced readability**: Code blocks expand to fill the entire screen,
- **Dark overlay**: Minimizes distractions with a semi-transparent background,
- **Optimized zoom**: Automatically applies configurable zoom levels for better code visibility.

```javascript title="Example Code Block"
// Click the fullscreen button (⛶) to see this in fullscreen mode

// This code block will have a fullscreen button
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to the documentation`;
}

const user = "Developer";
greetUser(user);
```

## Keyboard Navigation

The plugin provides comprehensive keyboard support for enhanced accessibility and user experience:

### Fullscreen Controls

- **Escape key**: Quickly exit fullscreen mode (configurable),
- **Browser back button**: Use your browser's back button to exit fullscreen (configurable),
- **Tab navigation**: Full keyboard navigation support within fullscreen mode.

### Code Block Cycling

Navigate between multiple code blocks on the same page using keyboard shortcuts:

- **Tab Key**: Cycle forward through all code blocks with fullscreen buttons on the current page,
- **Enter Key**: Activate the fullscreen mode for the currently focused code block,
- **Shift + Tab**: Cycle backward through code blocks (standard browser behavior).

This feature is particularly useful when you have multiple code examples and want to quickly navigate between them without using the mouse.

### Keyboard Accessibility

- **Tab Navigation**: Full keyboard navigation through all interactive elements,
- **Enter Activation**: Press Enter to activate fullscreen on focused code blocks,
- **Escape Exit**: Press Escape to exit fullscreen mode.

## Performance Features

Optimized for performance and smooth user experience:

## Customization Options

Extensive customization options to fit your site's needs:

### Visual Customization

- **Custom Icons**: Use your own SVG paths for fullscreen buttons,
- **Animation Duration**: Adjust transition speeds (150-700ms),
- **Zoom Levels**: Configure fullscreen zoom levels for optimal readability,
- **Button Placement**: Control which code blocks get fullscreen buttons.

### History Integration

- **Browser History**: Proper integration with browser history for back button support,
- **URL Management**: Manages URL state without affecting navigation,
- **State Restoration**: Correctly restores previous state when navigating.

## Usage Examples

### Basic Navigation

1. **Focus a code block**: Use Tab to navigate to any code block on the page,
2. **Enter fullscreen**: Press Enter or click the fullscreen button,
3. **Navigate in fullscreen**: Use Tab to move through the code content,
4. **Exit fullscreen**: Press Escape, use the back button, or click the exit button.

### Multi-Block Navigation

1. **Cycle through blocks**: Use Tab to move between different code blocks,
2. **Quick activation**: Press Enter on any focused code block to enter fullscreen,
3. **Seamless switching**: Exit one block and immediately navigate to another.

## Code Block Detection

Intelligent detection of different code block types:

### Supported Code Block Types

- **Standard Docusaurus**: Works with all standard Docusaurus code blocks,
- **Titled Blocks**: Full support for code blocks with titles,
- **Untitled Blocks**: Optional support for code blocks without titles,
- **Language-specific**: Works with all programming language syntax highlighting.
