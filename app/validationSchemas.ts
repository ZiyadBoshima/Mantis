import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65635)
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(65635)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export const commentSchema = z.object({
  text: z.string().min(1, 'Write a comment.').max(65635),
  issueId: z.number().int().positive().min(1, 'IssueId is required'),
  userId: z.string().min(1, 'User ID is required').max(255),
});

export const commentWithTextOnlySchema = z.object({
  text: z.string().min(1, 'Write a comment.').max(65635),
});

export const userSignupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address').min(1, 'Email is required').max(255),
  password: z.string().min(1, 'Password is required').max(255),
})

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required').max(255),
  password: z.string().min(1, 'Password is required').max(255),
})

