import { Button } from "./common/Button";
import { TextArea } from "./common/TextArea";
import { type FeedbackSchema } from "../schemas/feedback";
import { useFeedbackForm } from "../hooks/useFeedbackForm";

interface FeedbackViewProps {
  view: "idea" | "other";
  onSubmit: (data: FeedbackSchema) => Promise<void>;
  onSuccess: () => void;
}

export function FeedbackView({ view, onSubmit, onSuccess }: FeedbackViewProps) {
  const { register, handleSubmit, errors, isSubmitting } = useFeedbackForm({
    type: view,
    onSubmit,
    onSuccess,
  });

  const getPlaceholder = () => {
    switch (view) {
      case "idea":
        return "I have an idea for...";
      case "other":
        return "I'd like to tell you about...";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="space-y-1">
        <TextArea
          {...register("content")}
          placeholder={getPlaceholder()}
          autoFocus
          variant={errors.content ? "error" : "default"}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} fullWidth>
        Send feedback
      </Button>
    </form>
  );
}
