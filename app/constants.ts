import * as z from "zod";

export const formSchema = z.object({
  stepText: z.string().min(0, {
    message: "Text is required."
  }),
});
