'use client'

import { Spinner } from '@/app/components'
import { commentSchema, commentWithTextOnlySchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, CalloutText, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  issueId: number
  userId: string
}

type CommentFormData = z.infer<typeof commentSchema>

const CommentForm = ({ issueId, userId }: Props) => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CommentFormData>({
    resolver: zodResolver(commentWithTextOnlySchema)
  })

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('')
      setSubmitting(true)

      data.issueId = issueId
      data.userId = userId
      await axios.post('/api/comments', data)

      setSubmitting(false)
      setValue('text', '')
      router.refresh()
    } catch(error) {
      setSubmitting(false)
      setError('An unexpected error occured.')
    }
  })

  return (
    <div>
      <form className='mt-6 flex flex-col gap-2' onSubmit={onSubmit}>
        <div className='flex flex-col gap-1 rounded-lg border border-slate-300'>
          <Text weight="medium" ml="2" mt="1">
            Add a comment
          </Text>
          <textarea placeholder={errors.text?.message} className='p-2 h-20 rounded-b-lg border-t border-slate-300' {...register('text')} />
        </div>
        <Flex justify="end">
          <Button disabled={isSubmitting} type='submit'>
            Add Comment {' '}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
      {error && (
        <Callout.Root color="red" className='mt-5'>
          <CalloutText>{error}</CalloutText>
        </Callout.Root>
      )}
    </div> 
  )
}

export default CommentForm