import { Prisma } from "@prisma/client";

const issueWithUser = Prisma.validator<Prisma.IssueDefaultArgs>()({
  include: { assignedToUser: true }
})

export type IssueWithUser = Prisma.IssueGetPayload<typeof issueWithUser>

const commentWithIssueAndUser = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: { 
    user: true, 
    issue: true,
  }
})

export type CommentWithIssueAndUser = Prisma.CommentGetPayload<typeof commentWithIssueAndUser> 