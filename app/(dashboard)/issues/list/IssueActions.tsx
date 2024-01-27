import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'
import IssueAssigneeFilter from './IssueAssigneeFilter'
import prisma from '@/prisma/client'

const IssueActions = async () => {
  const users = await prisma.user.findMany()

  return (
    <Flex justify="between">
      <Flex gap="3">
        <IssueStatusFilter />
        <IssueAssigneeFilter users={users} />
      </Flex>
      <Button>
        <Link href='/issues/new'>New Issues</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions