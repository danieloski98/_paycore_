import React from 'react'
import { useForm as hookForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface IProps {
    mode: 'onChange' | 'all' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all',
    defaultValues?: Record<string, any>
    resolver?: any // zod schema
}

function useForm({
    mode,
    defaultValues,
    resolver
}: IProps) {
    const methods = hookForm({
        mode,
        defaultValues,
        resolver: zodResolver(resolver)
    });

    const renderForm = (children: React.ReactNode) => {
        return (
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        )
    }
  return {
    renderForm,
    ...methods
  }
}

export default useForm