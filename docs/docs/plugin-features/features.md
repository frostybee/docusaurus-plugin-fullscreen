---
title: Features
description: Explore the comprehensive features of the docusaurus-plugin-fullscreen plugin.
---

# Features

The Docusaurus Code Block Fullscreen plugin enhances your documentation experience by providing fullscreen functionality for code blocks. Here's a comprehensive overview of all the features available.

## 🖥️ Fullscreen Mode

Transform any code block into a distraction-free fullscreen view with a single click. The fullscreen mode provides:

- **Enhanced readability**: Code blocks expand to fill the entire screen
- **Dark overlay**: Minimizes distractions with a semi-transparent background
- **Optimized zoom**: Automatically applies configurable zoom levels for better code visibility
- **Smooth transitions**: Elegant animations when entering and exiting fullscreen mode

```javascript title="Example Code Block"
// This code block will have a fullscreen button
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to the documentation`;
}

// Click the fullscreen button (⛶) to see this in fullscreen mode
const user = "Developer";
greetUser(user);
```

## ⌨️ Keyboard Navigation

The plugin provides comprehensive keyboard support for enhanced accessibility and user experience:

### Fullscreen Controls

- **Escape key**: Quickly exit fullscreen mode (configurable)
- **Browser back button**: Use your browser's back button to exit fullscreen (configurable)
- **Tab navigation**: Full keyboard navigation support within fullscreen mode

### Code Block Cycling

Navigate between multiple code blocks on the same page using keyboard shortcuts:

- **Tab Key**: Cycle forward through all code blocks with fullscreen buttons on the current page
- **Enter Key**: Activate the fullscreen mode for the currently focused code block
- **Shift + Tab**: Cycle backward through code blocks (standard browser behavior)

This feature is particularly useful when you have multiple code examples and want to quickly navigate between them without using the mouse.

## 🎨 Theme Integration

The plugin seamlessly integrates with your Docusaurus theme:

### Automatic Theme Detection

- **Light/Dark Mode**: Automatically adapts to your site's current theme
- **Color Inheritance**: Inherits your site's color scheme and styling
- **CSS Variables**: Uses Docusaurus CSS variables for consistent styling
- **Theme Switching**: Responds to real-time theme changes

### Visual Consistency

- **Button Styling**: Fullscreen buttons match your site's button design
- **Typography**: Uses your site's font family and sizing
- **Spacing**: Consistent with your site's spacing and layout patterns

## 📱 Responsive Design

The plugin works seamlessly across all device sizes:

### Mobile Optimization

- **Touch-friendly**: Large touch targets for mobile devices
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Mobile Gestures**: Supports mobile-specific interaction patterns

### Desktop Enhancement

- **Hover Effects**: Smooth hover animations and visual feedback
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Multi-monitor**: Works correctly with multiple monitor setups

## ♿ Accessibility Features

Built with accessibility in mind to ensure everyone can use the fullscreen functionality:

### Screen Reader Support

- **ARIA Labels**: Proper ARIA labels for all interactive elements
- **Role Attributes**: Correct role attributes for fullscreen containers
- **Semantic HTML**: Uses semantic HTML elements for better screen reader navigation

### Focus Management

- **Focus Trap**: Maintains focus within fullscreen mode for keyboard users
- **Focus Restoration**: Returns focus to the original element when exiting fullscreen
- **Visual Focus**: Clear visual focus indicators for keyboard navigation

### Keyboard Accessibility

- **Tab Navigation**: Full keyboard navigation through all interactive elements
- **Enter Activation**: Press Enter to activate fullscreen on focused code blocks
- **Escape Exit**: Press Escape to exit fullscreen mode

## ⚡ Performance Features

Optimized for performance and smooth user experience:

### Efficient Rendering

- **Hardware Acceleration**: Uses CSS transforms for smooth animations
- **Minimal DOM Changes**: Efficient DOM manipulation for better performance
- **Memory Management**: Proper cleanup of event listeners and resources

### Smart Loading

- **Lazy Initialization**: Only initializes when needed
- **Event Delegation**: Efficient event handling for multiple code blocks
- **Debounced Events**: Prevents excessive event firing

## 🔧 Customization Options

Extensive customization options to fit your site's needs:

### Visual Customization

- **Custom Icons**: Use your own SVG paths for fullscreen buttons
- **Animation Duration**: Adjust transition speeds (150-700ms)
- **Zoom Levels**: Configure fullscreen zoom levels for optimal readability
- **Button Placement**: Control which code blocks get fullscreen buttons

### Behavioral Customization

- **Exit Methods**: Configure escape key and back button behavior
- **Tooltip Text**: Customize button tooltip messages
- **Container Classes**: Use custom CSS classes for styling

## 🔄 State Management

Advanced state management for reliable user experience:

### Session Persistence

- **Zoom Memory**: Remembers and restores browser zoom levels
- **Scroll Position**: Saves and restores scroll position when exiting fullscreen
- **User Preferences**: Stores user preferences in localStorage

### History Integration

- **Browser History**: Proper integration with browser history for back button support
- **URL Management**: Manages URL state without affecting navigation
- **State Restoration**: Correctly restores previous state when navigating

## 🎯 Usage Examples

### Basic Navigation

1. **Focus a code block**: Use Tab to navigate to any code block on the page
2. **Enter fullscreen**: Press Enter or click the fullscreen button
3. **Navigate in fullscreen**: Use Tab to move through the code content
4. **Exit fullscreen**: Press Escape, use the back button, or click the exit button

### Multi-Block Navigation

1. **Cycle through blocks**: Use Tab to move between different code blocks
2. **Quick activation**: Press Enter on any focused code block to enter fullscreen
3. **Seamless switching**: Exit one block and immediately navigate to another

## 🛡️ Browser Compatibility

The plugin supports all modern browsers:

- **Chrome**: 90+ (full support)
- **Firefox**: 88+ (full support)
- **Safari**: 14+ (full support)
- **Edge**: 90+ (full support)

### Feature Degradation

- **Older Browsers**: Graceful degradation for unsupported features
- **JavaScript Disabled**: Code blocks remain functional without JavaScript
- **CSS Support**: Progressive enhancement based on CSS feature support

## 🔍 Code Block Detection

Intelligent detection of different code block types:

### Supported Code Block Types

- **Standard Docusaurus**: Works with all standard Docusaurus code blocks
- **Titled Blocks**: Full support for code blocks with titles
- **Frameless Blocks**: Optional support for code blocks without titles
- **Language-specific**: Works with all programming language syntax highlighting

### Smart Integration

- **Automatic Detection**: Automatically finds and enhances code blocks
- **Non-intrusive**: Doesn't interfere with existing code block functionality
- **Plugin Compatibility**: Works alongside other Docusaurus plugins

## 🎨 Animation System

Smooth and polished animations enhance the user experience:

### Transition Effects

- **Scale Animations**: Smooth scaling transitions when entering/exiting fullscreen
- **Fade Effects**: Elegant fade-in/out for overlay elements
- **Configurable Duration**: Adjustable animation speeds (150-700ms)

### Performance Optimized

- **Hardware Acceleration**: Uses CSS transforms for optimal performance
- **Reduced Motion**: Respects user's reduced motion preferences
- **Smooth Framerate**: Maintains 60fps animations on supported devices

## 🔧 Developer Features

Features that make the plugin easy to integrate and customize:

### Easy Integration

- **Zero Configuration**: Works out of the box with sensible defaults
- **Flexible Setup**: Extensive configuration options when needed
- **Plugin Architecture**: Follows Docusaurus plugin conventions

### Debugging Support

- **Console Logging**: Helpful console messages for debugging
- **Error Handling**: Graceful error handling and recovery
- **Development Mode**: Additional debugging features in development

This comprehensive feature set makes the Docusaurus Code Block Fullscreen plugin a tool for enhancing your documentation site's user experience while maintaining accessibility and performance standards. 