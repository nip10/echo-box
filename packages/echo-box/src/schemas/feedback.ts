import { z } from "zod";

export const feedbackSchema = z.object({
  content: z
    .string()
    .min(1, "Please enter your feedback")
    .max(1000, "Feedback is too long"),
  type: z.enum(["report", "idea", "other"]),
  screenshot: z.string().nullable().optional(),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
