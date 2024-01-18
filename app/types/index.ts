import { Prisma } from "@prisma/client";

const issueWithUser = Prisma.validator<Prisma.IssueDefaultArgs>()({
  include: { assignedToUser: true }
})

export type IssueWithUser = Prisma.IssueGetPayload<typeof issueWithUser>