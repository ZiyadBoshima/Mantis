import { CommentWithUser } from '@/app/types'
import { fromNow } from '@/app/utils/fromNow'
import prisma from '@/prisma/client'
import { Avatar, Button, Flex, Text } from '@radix-ui/themes'

const CommentSection = async ({ issueId }: { issueId: number }) => {
  const comments: CommentWithUser[] = await prisma.comment.findMany({
    where: { issueId },
    include: { user: true },
    orderBy: { createdAt: 'asc' }
  })

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
      <AddComment />
    </div>
  )
}

const CommentCard = ({ comment }: { comment: CommentWithUser }) => {
  const { user } = comment

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-slate-300">
      <Flex align='center' gap="2" className='rounded-t-lg bg-slate-50 px-2 py-1 border-b group border-slate-300'>
        <Avatar
          src={user.image!}
          fallback="?"
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
      <Text className='pl-4 py-1 text-slate-600'>{comment.text}</Text>
    </div>
  )
}

const AddComment = () => {
  return (
    <div className='mt-6 flex flex-col gap-2'>
      <div className='flex flex-col gap-1 rounded-lg border border-slate-300'>
        <Text weight="medium" ml="2" mt="1">
          Add a comment
        </Text>
        <textarea className='p-2 h-20 rounded-b-lg border-t border-slate-300' />
      </div>
      <Flex justify="end">
        <Button className='w-30'>Add Comment</Button>
      </Flex>
    </div>
  )
}

export default CommentSection