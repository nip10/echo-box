import { ChevronLeft, X } from "lucide-preact";
import { IconButton } from "./common/IconButton";
import type { ViewState } from "./App";

interface WidgetHeaderProps {
  view: ViewState;
  onBack?: () => void;
  onClose: () => void;
}

export function WidgetHeader({ view, onBack, onClose }: WidgetHeaderProps) {
  const getTitle = () => {
    switch (view) {
      case "category":
        return "What's on your mind?";
      case "report":
        return "Report an issue";
      case "idea":
        return "Share your idea";
      case "other":
        return "Tell us more";
      case "success":
        return "Feedback sent";
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {onBack && (
        <IconButton onClick={onBack} aria-label="Go back">
          <ChevronLeft className="w-6 h-6" />
        </IconButton>
      )}
      <h3 className="text-xl font-semibold text-gray-800">{getTitle()}</h3>
      <IconButton onClick={onClose} aria-label="Close feedback widget">
        <X className="w-6 h-6" />
      </IconButton>
    </div>
  );
}
