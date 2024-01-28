import { CommentWithUser } from '@/app/types'
import { fromNow } from '@/app/utils/fromNow'
import prisma from '@/prisma/client'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import CommentForm from './CommentForm'
import { getServerSession } from "next-auth";
import authOptions from '@/app/auth/authOptions'

const CommentSection = async ({ issueId }: { issueId: number }) => {
  const session = await getServerSession(authOptions)

  const comments: CommentWithUser[] = await prisma.comment.findMany({
    where: { issueId },
    include: { user: true },
    orderBy: { createdAt: 'asc' }
  })

  var userId: string | undefined
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { 
        email: session.user.email
      },
      select: {
        id: true
      }
    })

    userId = user?.id
  }
  
  return (
    <div className='mt-5'>
      <div className='mb-2'>
        <Text size="5" weight="medium">
          Comments
        </Text> 
      </div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <CommentCard  comment={comment} />
          {index != comments.length - 1 && <div className='mx-auto w-0.5 h-6 bg-slate-200' />}
        </div>
      ))}
      <CommentForm issueId={issueId} userId={userId!}/>
    </div>
  )
}

const CommentCard = ({ comment }: { comment: CommentWithUser }) => {
  const { user } = comment

  return (
    <div className="flex flex-col rounded-lg border border-slate-300">
      <Flex align='center' gap="2" className='rounded-t-lg bg-slate-50 px-2 py-1 border-b group border-slate-300'>
        <Avatar
          src={user.image!}
          fallback={user!.name![0]}
          size="1"
          radius='full'
        />
        <Flex>
          <Text>
            <span className='font-medium'>{user.name}</span>
            <span className='text-slate-500'> commented on </span>
            <span className='text-slate-500'>{fromNow({ dateTime: comment.createdAt })}</span>
          </Text>
        </Flex>
      </Flex>
      <Text className='px-4 py-1 text-slate-600'>{comment.text}</Text>
    </div>
  )
}

export default CommentSection