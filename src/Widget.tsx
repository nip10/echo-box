import { render } from "preact";
import { App } from "./components/App";
import { EchoboxIcon } from "./components/EchoboxIcon";

export type WidgetOptions = {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  onSubmit?: (data: any) => Promise<void>;
};

export class EchoBoxWidget {
  private container: HTMLElement | null = null;
  private _isOpen: boolean = false;
  private options: WidgetOptions;

  constructor(options: WidgetOptions = {}) {
    this.options = {
      position: "bottom-right",
      ...options,
    };

    this.init();
  }

  private init(): void {
    // Create widget container and append to body
    this.container = document.createElement("div");
    this.container.className =
      "echo-box-container fixed z-50 transition-all duration-300 ease-in-out";
    this.container.setAttribute("data-echo-box", "true");
    this.setPosition();

    // Add the trigger button initially
    this.renderTriggerButton();

    // Append to document
    document.body.appendChild(this.container);
  }

  private setPosition(): void {
    if (!this.container) return;

    const { position } = this.options;

    // Remove any existing position classes
    this.container.classList.remove(
      "bottom-4",
      "right-4",
      "bottom-4",
      "left-4",
      "top-4",
      "right-4",
      "top-4",
      "left-4"
    );

    // Add new position classes
    switch (position) {
      case "bottom-right":
        this.container.classList.add("bottom-4", "right-4");
        break;
      case "bottom-left":
        this.container.classList.add("bottom-4", "left-4");
        break;
      case "top-right":
        this.container.classList.add("top-4", "right-4");
        break;
      case "top-left":
        this.container.classList.add("top-4", "left-4");
        break;
    }
  }

  private renderTriggerButton(): void {
    if (!this.container) return;

    const TriggerButton = () => {
      const handleClick = () => {
        this.open();
      };

      return (
        <button
          onClick={handleClick}
          className="flex items-center justify-center bg-white rounded-full shadow-lg w-12 h-12 hover:shadow-xl transition-shadow duration-300"
          aria-label="Open feedback widget"
        >
          <EchoboxIcon className="w-6 h-6" />
        </button>
      );
    };

    render(<TriggerButton />, this.container);
  }

  private renderWidget(): void {
    if (!this.container) return;

    const handleSubmit = async (data: any) => {
      if (this.options.onSubmit) {
        return this.options.onSubmit(data);
      }

      // Default implementation - log to console
      console.log("Feedback submitted:", data);
      return Promise.resolve();
    };

    render(
      <App onClose={() => this.close()} onSubmit={handleSubmit} />,
      this.container
    );
  }

  /**
   * Public methods
   */

  public open(): void {
    if (this._isOpen) return;

    this._isOpen = true;
    this.renderWidget();
  }

  public close(): void {
    if (!this._isOpen) return;

    this._isOpen = false;
    this.renderTriggerButton();
  }

  public setOptions(options: Partial<WidgetOptions>): void {
    this.options = {
      ...this.options,
      ...options,
    };

    // Update position if needed
    if (options.position) {
      this.setPosition();
    }

    // Re-render
    if (this._isOpen) {
      this.renderWidget();
    } else {
      this.renderTriggerButton();
    }
  }

  // Add a getter for the isOpen state
  public get isOpen(): boolean {
    return this._isOpen;
  }

  // Method to destroy the widget and remove it from DOM
  public destroy(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
  }
}
