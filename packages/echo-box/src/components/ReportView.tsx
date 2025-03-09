import { MonitorUp } from "lucide-preact";
import { Button } from "./common/Button";
import { TextArea } from "./common/TextArea";
import { type FeedbackSchema } from "../schemas/feedback";
import { useFeedbackForm } from "../hooks/useFeedbackForm";
import { useScreenshot } from "../hooks/useScreenshot";

interface ReportViewProps {
  onSubmit: (data: FeedbackSchema) => Promise<void>;
  onSuccess: () => void;
}

export function ReportView({ onSubmit, onSuccess }: ReportViewProps) {
  const { screenshotData, capture, reset: resetScreenshot } = useScreenshot();
  const { register, handleSubmit, errors, isSubmitting } = useFeedbackForm({
    type: "report",
    onSubmit: async (data) => {
      await onSubmit({
        ...data,
        screenshot: screenshotData,
      });
      resetScreenshot();
    },
    onSuccess,
  });

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="space-y-1">
        <TextArea
          {...register("content")}
          placeholder="I noticed that..."
          autoFocus
          variant={errors.content ? "error" : "default"}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={capture}
          variant="secondary"
          className={
            !!screenshotData
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : ""
          }
          aria-label="Capture screenshot"
          title="Capture screenshot"
          type="button"
        >
          <MonitorUp className="w-5 h-5" />
        </Button>

        <Button type="submit" loading={isSubmitting} fullWidth>
          Send feedback
        </Button>
      </div>
    </form>
  );
}
