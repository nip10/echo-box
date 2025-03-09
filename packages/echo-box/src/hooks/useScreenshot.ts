import { useState } from "preact/hooks";

// Define a global interface for html2canvas
declare global {
  interface Window {
    html2canvas?: (
      element: HTMLElement,
      options?: any
    ) => Promise<HTMLCanvasElement>;
  }
}

export function useScreenshot() {
  const [screenshotData, setScreenshotData] = useState<string | null>(null);

  const loadHtml2Canvas = async (): Promise<boolean> => {
    if (window.html2canvas) {
      return true;
    }

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };

  const capture = async () => {
    try {
      // First, try to load html2canvas if not already loaded
      const loaded = await loadHtml2Canvas();

      if (!loaded || !window.html2canvas) {
        console.warn(
          "html2canvas failed to load. Screenshot feature disabled."
        );
        setScreenshotData(null);
        return;
      }

      // Hide the widget temporarily for the screenshot
      const widgetElements = document.querySelectorAll("[data-echo-box]");
      widgetElements.forEach((el) => {
        (el as HTMLElement).style.visibility = "hidden";
      });

      // Capture the screenshot
      const canvas = await window.html2canvas(document.body, {
        logging: false,
        allowTaint: true,
        useCORS: true,
        scale: window.devicePixelRatio,
      });

      // Restore widget visibility
      widgetElements.forEach((el) => {
        (el as HTMLElement).style.visibility = "";
      });

      const screenshot = canvas.toDataURL("image/png");
      setScreenshotData(screenshot);
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
      setScreenshotData(null);
    }
  };

  const reset = () => {
    setScreenshotData(null);
  };

  const download = (filename: string = "screenshot.png") => {
    if (!screenshotData) return;

    const link = document.createElement("a");
    link.download = filename;
    link.href = screenshotData;
    link.click();
  };

  return {
    screenshotData,
    capture,
    reset,
    download,
  };
}
