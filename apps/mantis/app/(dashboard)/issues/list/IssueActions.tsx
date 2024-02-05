import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'
import IssueAssigneeFilter from './IssueAssigneeFilter'
import prisma from '@/prisma/client'

const IssueActions = async () => {
  const users = await prisma.user.findMany()

  return (
    <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
      <div className='flex gap-3 justify-between'>
        <IssueStatusFilter />
        <IssueAssigneeFilter users={users} />
      </div>
      <Button>
        <Link href='/issues/new'>New Issues</Link>
      </Button>
    </div>
  )
}

export default IssueActions