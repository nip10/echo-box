import { EchoBoxWidget, WidgetOptions } from "./Widget";
import "./styles.css";

// Create a namespace for the widget
declare global {
  interface Window {
    EchoBox?: {
      init: (options?: WidgetOptions) => EchoBoxWidget;
    };
  }
}

// Export the widget initialization function
export const init = (options = {}) => new EchoBoxWidget(options);

// Export for IIFE/script tag usage
window.EchoBox = { init };

// Auto-initialize if data attribute is present
document.addEventListener("DOMContentLoaded", () => {
  const autoInitElements = document.querySelectorAll("[data-echo-box-auto]");

  autoInitElements.forEach((element) => {
    const options: WidgetOptions = {
      // Parse options from data attributes
      position:
        (element.getAttribute("data-echo-box-position") as any) ||
        "bottom-right",
      primaryColor: element.getAttribute("data-echo-box-color") || "#FF7846",
    };

    new EchoBoxWidget(options);
  });
});
