'use client'

import { ColumnDef } from '@tanstack/react-table'

export type BookRow = {
  book_id: string
  title: string
  author: string
}

export const columns: ColumnDef<BookRow>[] = [
  {
    accessorKey: 'book_id',
    header: 'id',
  },
  {
    accessorKey: 'title',
    header: 'title',
  },
  {
    accessorKey: 'author',
    header: 'author',
  },
]
