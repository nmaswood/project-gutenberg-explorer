import { Button } from '@/components/ui/button'
import BookForm from './form'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: todos } = await supabase.from('books').select()
  console.log(todos)

  return (
    <main className="h-full">
      <Link href="/saved">
        <Button variant="link">Saved books</Button>
      </Link>
      <BookForm />
    </main>
  )
}
