import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { DataTable } from './data-table'
import { BookRow, columns } from './columns'

export default async function SavedPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.from('books').select('book_id, title, author')
  const books = data as BookRow[]

  return (
    <>
      <Link href="/">
        <Button variant="link">Home</Button>
      </Link>
      <div className="container mx-auto py-10 max-w-4xl">
        <DataTable columns={columns} data={books} />
      </div>
    </>
  )
}
