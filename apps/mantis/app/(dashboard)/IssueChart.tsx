'use client'

import { Card } from "@radix-ui/themes"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'
interface Props {
  open: number,
  inProgress: number,
  closed: number
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ]

  return (
    <Card className="lg:h-full h-52">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar 
            dataKey="value" 
            barSize={60} 
            style={{ fill: 'var(--accent-9)'}} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart