import { Status } from '@prisma/client'
import { Avatar, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { CommentWithIssueAndUser } from '../types'
import { fromNow } from '../utils/fromNow'

const LatestActivity = ({ comments }: { comments: CommentWithIssueAndUser[] }) => {
  return (
    <Card>
      <Heading size="4">Latest Activity</Heading>
      <Flex direction="column" gap="5" py="5">
        {comments.map(comment => (
          <CommentCard key={comment.id} comment={comment}/>
        ))}
      </Flex>
    </Card>
  )
}

const CommentCard = ({ comment }: { comment: CommentWithIssueAndUser }) => {
  const { user, issue } = comment

  return (
    <Link href={'/issues/' + issue.id} className="flex flex-col gap-1 mx-5 rounded-lg border border-slate-300 group hover:border-slate-400 transition-colors">
      <Flex align='center' gap="2" className='rounded-t-lg bg-slate-50 px-2 py-1 border-b group border-slate-300 group-hover:border-slate-400 transition-colors'>
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
            <span className={(issue.status === Status.OPEN) 
              ? 'text-red-600' 
              : (issue.status === Status.IN_PROGRESS) 
              ? 'text-violet-600' 
              : 'text-green-600'}
            >
              {issue.title}&nbsp;
            </span> 
            <span className='text-slate-500'>{fromNow({ dateTime: comment.createdAt })}</span>
          </Text>
        </Flex>
      </Flex>
      <Text className='pl-4 py-1 text-slate-600'>{comment.text}</Text>
    </Link>
  )
}

export default LatestActivity