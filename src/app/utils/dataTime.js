import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const timeAgo = (timestamp) => {
  return dayjs(timestamp).fromNow()
}

// console.log(timeAgo("2025-01-29 11:14:25")) // e.g., "1 hour ago"
