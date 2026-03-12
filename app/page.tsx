import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import CalendarClient from '@/components/calendar-client'

export default async function ProtectedPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <p>Detta är en sida man endast kan besöka om man är inloggad</p>
      <CalendarClient />
    </div>
  )
}