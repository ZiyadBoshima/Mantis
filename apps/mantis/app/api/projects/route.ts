import authOptions from "@/app/auth/authOptions"
import { projectSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = projectSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const user = await prisma.user.findUnique({
    where: { id: body.adminId },
    select: { id: true },
  })
  if (!user)
    return NextResponse.json({ userId: "Project admin not found." }, { status: 404 })

  const project = await prisma.project.create({ data: {...body} })
  return NextResponse.json({ project }, { status: 201 })
}
