# EchoBox - Lightweight Feedback Widget

EchoBox is a lightweight, customizable feedback widget for any website. Built with Preact and TypeScript, it provides an elegant interface for collecting user feedback without adding bloat to your site.

## Features

- **Multiple Feedback Types:** Collect bug reports, feature ideas, and general feedback
- **Screenshot Capture:** Built-in screenshot functionality for bug reports
- **Modern UI:** Clean, responsive design with smooth animations
- **Lightweight:** Built with Preact for minimal bundle size
- **Fully Typed:** Written in TypeScript for better development experience
- **Customizable:** Easy to customize appearance and behavior
- **Accessible:** Built with accessibility in mind

## Installation

```bash
npm install echo-box
# or
pnpm add echo-box
```

## Usage

### Basic Usage

```javascript
import { EchoBox } from 'echo-box';

// Initialize the widget
const widget = EchoBox.init({
  position: 'bottom-right',
  onSubmit: async (data) => {
    // Handle the feedback data
    console.log('Feedback received:', data);

    // Example: Send to your API
    await fetch('https://api.example.com/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
});

// Control the widget programmatically
widget.open();  // Open the widget
widget.close(); // Close the widget
```

### Via Script Tag

```html
<script src="https://unpkg.com/echo-box/dist/echo-box.js"></script>
<script>
  const widget = EchoBox.init({
    position: 'bottom-right',
    onSubmit: async (data) => {
      console.log('Feedback received:', data);
    }
  });
</script>
```

### Auto-initialization

You can also automatically initialize the widget using data attributes:

```html
<div
  data-echo-box-auto
  data-echo-box-position="bottom-right"
></div>
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | 'bottom-right' | Widget position ('bottom-right', 'bottom-left', 'top-right', 'top-left') |
| `onSubmit` | function | - | Callback function when feedback is submitted |

## Feedback Data Structure

The feedback data object has the following structure:

```typescript
interface FeedbackData {
  type: 'report' | 'idea' | 'other';  // Type of feedback
  content: string;                     // Feedback text content
  screenshot?: string | null;          // Base64 screenshot (only for bug reports)
}
```

## Methods

The widget instance provides the following methods:

- `open()`: Opens the feedback widget
- `close()`: Closes the feedback widget
- `setOptions(options)`: Updates widget options

## Browser Support

EchoBox supports all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Development

This is a monorepo managed with pnpm workspaces. The project is structured as follows:

```
.
├── packages/
│   └── echo-box/      # Core package
└── apps/
    ├── react/         # React demo
    └── vanilla/       # Vanilla JS demo
```

To get started with development:

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run the demo app
pnpm demo
```

## Acknowledgements

This project was inspired by [Feedback Fish](https://feedback.fish), a fantastic feedback widget service. While EchoBox is a different implementation, we appreciate their innovative approach to user feedback collection.

## License

MIT License