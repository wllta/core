import * as z from 'zod/mini'

export const TMAUserSchema = z.object({
  addedToAttachmentMenu: z.optional(z.boolean()),
  allowsWriteToPm: z.optional(z.boolean()),
  isPremium: z.optional(z.boolean()),
  firstName: z.string(),
  id: z.number(),
  isBot: z.optional(z.boolean()),
  lastName: z.optional(z.string()),
  languageCode: z.optional(z.string()),
  photoUrl: z.optional(z.string()),
  username: z.optional(z.string()),
})

export type TMAUser = z.infer<typeof TMAUserSchema>
