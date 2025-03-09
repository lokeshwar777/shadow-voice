import {z} from "zod";

export const acceptMessageSchema = z.object({
    content: z.boolean()
});