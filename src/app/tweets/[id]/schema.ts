import { z } from "zod";

export const commentSchema = z.object({
  tweetId: z.coerce.number({
    required_error: "tweetId is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

export type CommentType = z.infer<typeof commentSchema>;
