import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== 'number') notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  })

  if (!issue) notFound()

  return (
    <Grid columns={{initial: "1", sm: "5"}} gap="4">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage