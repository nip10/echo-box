import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, type FeedbackSchema } from "../schemas/feedback";

type FeedbackFormType = "report" | "idea" | "other";

interface UseFeedbackFormProps {
  type: FeedbackFormType;
  onSubmit: (data: FeedbackSchema) => Promise<void>;
  onSuccess?: () => void;
}

export function useFeedbackForm({
  type,
  onSubmit,
  onSuccess,
}: UseFeedbackFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type,
      content: "",
      screenshot: null,
    },
  });

  const handleFormSubmit = async (data: FeedbackSchema) => {
    try {
      await onSubmit(data);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
  };
}
