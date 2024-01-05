import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link href={`/issues/edit/${issueId}`} className='flex items-center gap-1'>
        <Pencil2Icon />
        <Text>
          Edit Issue
        </Text>
      </Link>
    </Button>
  )
}

export default EditIssueButton