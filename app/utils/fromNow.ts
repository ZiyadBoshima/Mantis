import moment from 'moment'

export const fromNow = ({ dateTime }: { dateTime: Date }) => {
  const createdAt = moment.utc(dateTime)

  return moment(createdAt).fromNow()
}