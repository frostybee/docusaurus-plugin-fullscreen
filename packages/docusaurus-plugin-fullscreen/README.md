# Docusaurus Fullscreen Plugin

A Docusaurus plugin that adds fullscreen functionality to code blocks, allowing users to view code in an immersive, distraction-free fullscreen mode.

## Installation

Install the plugin using your preferred package manager:

```bash
npm install docusaurus-plugin-fullscreen
```

```bash
yarn add docusaurus-plugin-fullscreen
```

```bash
pnpm add docusaurus-plugin-fullscreen
```

## Usage

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  // ... other config
  plugins: [
    'docusaurus-plugin-fullscreen',
  ],
  // ... rest of your config
};
```

## Configuration

The plugin can be configured with custom options:

```js
module.exports = {
  // ... other config
  plugins: [
    [
      'docusaurus-plugin-fullscreen',
      {
        // Custom configuration options
        fullscreenButtonTooltip: 'Toggle fullscreen mode',
        enableEscapeKey: true,
        exitOnBrowserBack: true,
        addToUntitledBlocks: true,
        fullscreenZoomLevel: 120,
        animationDuration: 200,
      },
    ],
  ],
  // ... rest of your config
};
```

## Requirements

- Node.js 18.0 or higher
- Docusaurus 3.0 or higher
- React 18.0 or higher


## Documentation

For comprehensive documentation and examples, visit the [plugin documentation](https://frostybee.github.io/starlight-codeblock-fullscreen/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

Licensed under the MIT License, Copyright © frostybee.

See [LICENSE](/LICENSE) for more information.

## 🔗 Links

- [GitHub Repository](https://github.com/frostybee/docusaurus-plugin-fullscreen)
- [npm Package](https://www.npmjs.com/package/docusaurus-plugin-fullscreen)
- [Documentation](https://frostybee.github.io/docusaurus-plugin-fullscreen/)
- [Issues](https://github.com/frostybee/docusaurus-plugin-fullscreen/issues)