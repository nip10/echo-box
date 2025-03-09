export type FeedbackFormData = {
  content: string;
  type: "report" | "idea" | "other";
  screenshot?: string | null;
};
