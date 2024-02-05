import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { commentSchema } from "../../validationSchemas"
import { getServerSession } from "next-auth"
import authOptions from "@/app/auth/authOptions"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({}, { status: 401 })
  
  const body = await request.json()
  const validation = commentSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const issue = await prisma.issue.findUnique({
    where: { id: body.issueId },
    select: { id: true }
  })
  if (!issue)
    return NextResponse.json({ issueId: 'Issue not found' }, { status: 404 })

  const user = await prisma.user.findUnique({
    where: { id: body.userId },
    select: { id: true }
  })
  if (!user)
    return NextResponse.json({ userId: 'User not found' }, { status: 404 })

  const newComment = await prisma.comment.create({
    data: { text: body.text, issueId: body.issueId, userId: body.userId }
  })

  return NextResponse.json(newComment, { status: 201 })
}