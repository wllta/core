import * as z from 'zod/mini'

// This schema is used to validate the user data received from Telegram Mini Apps
// But it duplicates the TMAUser type from API
export const TMAUserZodSchema = z.object({
  id: z.number(),
  firstName: z.string(),

  allowsWriteToPm: z.optional(z.boolean()),
  languageCode: z.optional(z.string()),

  isBot: z.optional(z.boolean()),
  lastName: z.optional(z.string()),
  photoUrl: z.optional(z.string()),
  username: z.optional(z.string()),
  isPremium: z.optional(z.boolean()),

  addedToAttachmentMenu: z.optional(z.boolean()),
})

export type TMAUserZod = z.infer<typeof TMAUserZodSchema>
