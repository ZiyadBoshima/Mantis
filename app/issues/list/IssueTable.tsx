import { IssueStatusBadge } from '@/app/components'
import { IssueWithUser } from '@/app/types'
import { Issue, Status, User } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Avatar, Table } from '@radix-ui/themes'
import Link from 'next/link'
import NextLink from 'next/link'

type SortOrder = 'asc' | 'desc'

export interface IssueQuery {
  userId?: string,
  status: Status, 
  orderBy: keyof Issue,
  sortOrder: SortOrder,
  page: string
}

interface Props {
  searchParams: IssueQuery,
  issues: IssueWithUser[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <NextLink href={{
                query: { ...searchParams, orderBy: column.value, sortOrder: (searchParams.sortOrder === 'asc') ? 'desc' : 'asc' }
              }}>
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && <SortIcon sortOrder={searchParams.sortOrder} />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id} align='center'>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>
                {issue.title}
              </Link>
              <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
            {issue.assignedToUser && (
              <Avatar
                src={issue.assignedToUser.image!} 
                fallback="?"
                size="1"
                radius='full'
                className='p-0'
              />
            )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const SortIcon = ({ sortOrder }: { sortOrder: SortOrder }) => {
  if (sortOrder === 'asc') return <ArrowUpIcon className='inline'/>
  else if (sortOrder === 'desc') return <ArrowDownIcon className='inline'/> 
  
  return null
}

const columns: { 
  label: string, 
  value: keyof Issue,
  className?: string 
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created At', value: 'createdAt', className: 'hidden md:table-cell' },
  { label: '', value: 'assignedToUserId', className: 'hidden md:table-cell' },
]

export const columnNames = columns.map(column => column.value)

export default IssueTable