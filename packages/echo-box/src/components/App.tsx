import { useState } from "preact/hooks";
import { ReportView } from "./ReportView";
import { CategoryView } from "./CategoryView";
import { FeedbackView } from "./FeedbackView";
import { SuccessView } from "./SuccessView";
import { WidgetFooter } from "./WidgetFooter";
import { WidgetHeader } from "./WidgetHeader";
import type { FeedbackFormData } from "../types/feedback";

export type ViewState = "category" | "report" | "idea" | "other" | "success";

interface AppProps {
  onClose: () => void;
  onSubmit: (data: FeedbackFormData) => Promise<void>;
}

export function App({ onClose, onSubmit }: AppProps) {
  const [view, setView] = useState<ViewState>("category");

  const handleCategorySelect = (
    type: Exclude<ViewState, "category" | "success">
  ) => {
    setView(type);
  };

  const handleBack = () => {
    setView("category");
  };

  const handleSuccess = () => {
    setView("success");
  };

  const handleClose = () => {
    setView("category");
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-80 max-w-full">
      <WidgetHeader
        view={view}
        onBack={
          view !== "success" && view !== "category" ? handleBack : undefined
        }
        onClose={handleClose}
      />
      <div
        className={`transition-[height] duration-200 ease-in-out ${
          view === "category" || view === "success" ? "h-[124px]" : "h-[186px]"
        }`}
      >
        {view === "category" && (
          <CategoryView onCategorySelect={handleCategorySelect} />
        )}

        {view === "report" && (
          <ReportView onSubmit={onSubmit} onSuccess={handleSuccess} />
        )}

        {(view === "idea" || view === "other") && (
          <FeedbackView
            view={view}
            onSubmit={onSubmit}
            onSuccess={handleSuccess}
          />
        )}

        {view === "success" && <SuccessView />}
      </div>

      <WidgetFooter />
    </div>
  );
}
