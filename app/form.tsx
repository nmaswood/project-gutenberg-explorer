'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { fetchBook, saveBook } from './actions'
import { useState } from 'react'
import { ObjectPrinter } from '@/components/object-printer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

const formSchema = z.object({
  bookID: z.string(),
})

export default function BookForm() {
  const [metadata, setMetadata] = useState()
  const [content, setContent] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit({ bookID }: z.infer<typeof formSchema>) {
    const { metadata, content } = await fetchBook(bookID)
    setMetadata(metadata)
    setContent(content)
  }

  async function onSave() {
    await saveBook({ content, metadata })
    toast.success(`Book ${form.getValues('bookID')} saved!`)
  }

  return (
    <div className="flex gap-4 items-center flex-col px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex gap-2 items-end"
        >
          <FormField
            control={form.control}
            name="bookID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          {metadata && (
            <Button variant="secondary" onClick={onSave}>
              Save
            </Button>
          )}
        </form>
      </Form>
      {metadata && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Metadata:</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <ObjectPrinter data={metadata} />
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Content:</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              {content}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  )
}
