import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

export function Button({ ...props }: ButtonProps) {
  return <ChakraButton height="3rem" {...props} />
}
