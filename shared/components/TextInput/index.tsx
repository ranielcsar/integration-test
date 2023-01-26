import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Box,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { ForwardedRef, forwardRef } from 'react'

type InputProps = {
  name: string
  label: string
} & ChakraInputProps

function Input({ name, label, ...props }: InputProps, ref: ForwardedRef<any>) {
  return (
    <FormControl
      display="flex"
      height="5rem"
      flexDir="column"
      justifyContent="space-evenly"
    >
      <FormLabel fontWeight={600} htmlFor={name}>
        {label}
      </FormLabel>
      <ChakraInput height="100%" {...props} name={name} ref={ref} />
    </FormControl>
  )
}

export const TextInput = forwardRef(Input)
