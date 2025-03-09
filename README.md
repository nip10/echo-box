# EchoBox - Lightweight Feedback Widget

EchoBox is a lightweight, customizable feedback widget for any website. Built with Preact and TypeScript, it provides an elegant interface for collecting user feedback without adding bloat to your site.

![EchoBox Screenshot](https://via.placeholder.com/800x400.png?text=EchoBox+Widget)

## Features

- **Multiple Feedback Types:** Collect issues, ideas, and general feedback
- **Screenshot Capture:** Optional screenshot functionality (requires html2canvas)
- **Lightweight:** Small footprint with minimal dependencies
- **Customizable:** Adjust position, colors, and more
- **Responsive:** Works well on mobile and desktop
- **Easy Integration:** Multiple installation methods

## Installation

### Via NPM

```bash
npm install echo-box
```

### Via CDN

```html
<script src="https://cdn.example.com/echo-box.js"></script>
```

## Usage

### Basic Usage

```javascript
// When using via NPM
import { EchoBoxWidget } from 'echo-box';

const widget = new EchoBoxWidget({
  position: 'bottom-right',
  primaryColor: '#FF7846',
  onSubmit: async (data) => {
    // Handle the feedback data
    console.log('Feedback received:', data);

    // Example of sending to a backend API
    await fetch('https://your-api.com/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
});
```

### Via Script Tag

```html
<script src="https://cdn.example.com/echo-box.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    EchoBox.init({
      position: 'bottom-right',
      primaryColor: '#FF7846',
      onSubmit: async (data) => {
        // Handle the feedback
        console.log('Feedback received:', data);
      }
    });
  });
</script>
```

### Auto Initialization

You can also automatically initialize the widget by adding data attributes to any element:

```html
<div
  data-echo-box-auto
  data-echo-box-position="bottom-right"
  data-echo-box-color="#FF7846"
></div>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | 'bottom-right' | Widget position: 'bottom-right', 'bottom-left', 'top-right', 'top-left' |
| `primaryColor` | string | '#FF7846' | Primary color for widget styling |
| `onSubmit` | function | undefined | Callback function when feedback is submitted |

## Methods

The EchoBox widget instance exposes the following methods:

- `open()`: Opens the feedback widget
- `close()`: Closes the feedback widget
- `setOptions(options)`: Updates the widget options

## Feedback Data Format

The data passed to the `onSubmit` callback has the following structure:

```javascript
{
  type: 'issue' | 'idea' | 'other', // Type of feedback
  content: string,                  // Feedback text content
  screenshot: string | null,        // Base64-encoded screenshot (if captured)
  timestamp: string                 // ISO timestamp of when feedback was submitted
}
```

## Screenshot Functionality

The screenshot functionality requires [html2canvas](https://html2canvas.hertzen.com/). If you want to use this feature, make sure to include html2canvas in your project:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

## Browser Support

EchoBox supports all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Development

To build the project locally:

```bash
# Install dependencies
npm install

# Build for development
npm run dev

# Build for production
npm run build:all
```

## License

MIT License