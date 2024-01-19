'use client'

import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"

const IssueAssigneeFilter = ({ users }: { users: User[] }) => {  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  return (
    <Select.Root
    defaultValue={searchParams.get('userId') || ''}
    onValueChange={(userId) => {
      const query = createQuery(userId, searchParams)
      router.push('/issues/list' + query)
    }}
    >
      <Select.Trigger placeholder="Filter by assignee..." />
      <Select.Content>
        <Select.Item key={'001'} value={'ALL'}>All</Select.Item>
        {users.map(user => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

const createQuery = (
  userId: string,
  searchParams: ReadonlyURLSearchParams 
) => {
  const params = new URLSearchParams()
  if (userId) params.append('userId', userId)
  if (searchParams.get('status'))
    params.append('status', searchParams.get('status')!)
  if (searchParams.get('orderBy')) {
    params.append('orderBy', searchParams.get('orderBy')!)
    params.append('sortOrder', searchParams.get('sortOrder')!)
  }
  
  return params.toString().length ? '?' + params.toString() : ''
}

export default IssueAssigneeFilter